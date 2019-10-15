import config from 'config';

export default {
    info: {
        title: config.get('app.name'),
        version: '1.0',
        descriptions: [config.get('app.description')],
    },
};