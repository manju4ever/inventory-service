import path from 'path';
import config from 'config';
import Hapi from '@hapi/hapi';
import Inert from '@hapi/inert';
import HapiAuthCookie from '@hapi/cookie';
import HapiDocs from '@surveylegend/hapi-docs';
import { MongoClient, Server as MongoServer } from 'mongodb';
import Redis from 'redis';
import bluebird from 'bluebird';

import logger from '~/utils/logger';
import Routes from '~/routes';
import HapiDocsOptions from '~/utils/HapiDocsOptions';
import { getEnvValue } from '~/utils';

// Promisify all redis functions using bluebird - Future is already here :)
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const server = new Hapi.Server({
  host: config.get('app.connection.host'),
  port: config.get('app.connection.port'),
  routes: {
    cors: config.get('app.connection.routes.cors'),
    files: {
      relativeTo: path.join(__dirname, 'public'),
    },
  },
});

server.ext([
  {
    type: 'onPreStart',
    method: async (server) => {
      try {
        if((getEnvValue('ENABLE_MONGO')) === 'yes') {
            const mongoConf = config.get('db.mongo');
            const mongoDb = await MongoClient.connect(new MongoServer(
                mongoConf.host,
                mongoConf.port,
                mongoConf.options || {},
            ));
            server.decorate('request', 'getMongo', () => {
              // Refer - https://github.com/mongodb/node-mongodb-native/blob/3.0.0/CHANGES_3.0.0.md
              return mongoDb.db(config.get("db.mongodb.database"));
          });
        }
        if((getEnvValue('ENABLE_REDIS')) === 'yes') {
            const redisConf = config.get('db.redis');
            const redisClient = await Redis.createClient(redisConf);
            server.decorate('request', 'getRedis', () => {
                return redisClient;
            });
         }
        return server;
      } catch (err) {
        logger.error('[Server] Connection to Mongo Instance Failed !');
        logger.error(err);
        process.exit(251);
      }
    },
  },
]);

server.register([
  Inert,
  HapiAuthCookie,
  {
    plugin: HapiDocs,
    options: HapiDocsOptions,
  }
]).then(() => {
  /**
    Initialize server - Make sure plugins, caches and other things
    are ready before listening to requests
  */
  server.auth.strategy('session', 'cookie', {
    cookie: {
      password: '980das9809d8asd098dsa098dsadsa09asd8089ads',
      isSecure: false,
      isSameSite: 'Lax',
    },
    validateFunc: (request, session) => {
      return  {
        valid: true,
        credentials: {
          username: "test",
        }
      }
    }
  });
  // server.auth.default('session');
  return server.initialize();
}).then(() => {
  Routes.forEach(route => server.route(route));
  return server.start();
}).then(() => {

  logger.info(`Server started at ${server.info.uri}`);

}).catch((err) => {
  server.stop();
  logger.error(err);
  process.exit(255);
});
