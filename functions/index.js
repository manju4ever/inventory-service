const functions = require('firebase-functions');
const api = require('./server');

const handler = serverless(api);

exports.app = functions.https.onRequest(async (event, resp) => {
    const options = {
        method: event.httpMethod,
        url: event.path,
        payload: event.body,
        headers: event.headers,
        validate: false
    };
    handler.inject(options, function (res) {
        const response = {
            statusCode: res.statusCode,
            body: res.result
        };
        resp.status(res.statusCode).send(res.result);
    });
});
