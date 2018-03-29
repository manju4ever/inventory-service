import config  from "config";
import Hapi, { Server } from "hapi";
import { MongoClient, Server as MongoServer} from "mongodb";
import Redis from "redis";
import WebSocket from "ws";
import Inert from "inert";
import Vision from "vision";
import HapiSwagger from "hapi-swagger";
import bluebird from "bluebird";
import HapiAuthCookie from "hapi-auth-cookie";

import SwaggerOptions from "utils/SwaggerOptions";
import Routes from "routes";

//Promisify all redis functions using bluebird - Future is already here :)
bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);

const server = new Hapi.Server({
    host: config.get('app.connection.host'),
    port: config.get('app.connection.port'),
    routes: config.get('app.connection.routes'),
});


server.ext([
    {
        type: 'onPreStart',
        method: async (server) => {
            try {
                const mongoConf = config.get('db.mongo');
                const redisConf = config.get('db.redis');
                const mongoDb = await MongoClient.connect(new MongoServer(
                    mongoConf.host,
                    mongoConf.port,
                    mongoConf.options || {},
                ));
                const redisClient = await  Redis.createClient(redisConf);
                server.decorate('request', 'getMongo', () => {
                    // Refer - https://github.com/mongodb/node-mongodb-native/blob/3.0.0/CHANGES_3.0.0.md
                    return mongoDb.db(config.get("db.mongodb.database")); 
                }); 
                server.decorate('request', 'getRedis', () => {
                    return redisClient;
                });
                return server;
            } catch(err) {
                console.error(`[Server] Connection to Mongo Instance Failed !`);
                console.error(err);
                process.exit(251);
            }
        },
    },
]);

server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: SwaggerOptions,
    },
    HapiAuthCookie,
]).then(() => {
    /*
       Initialize server - Make sure plugins, caches and other things
                           are ready before listening to requests
    */
   server.auth.strategy('session', 'cookie', {
       password: '980das9809d8asd098dsa098dsadsa09asd8089ads',
       isSecure: false,
       isSameSite: 'Lax'
   });
   server.auth.default('session');
    return server.initialize();
}).then(() => {
    Routes.forEach(route => server.route(route));
    return server.start();
}).then(() => {
    console.info(`Server started at ${server.info.uri}`);
}).catch((err) => {
    server.stop();
    console.error(err);
    process.exit(255);
});
