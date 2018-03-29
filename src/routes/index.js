import TestRoutes from "./test-route";

const IndexRoute = {
    path: '/',
    method: 'GET',
    config: {
        auth: "session",
    },
    handler: async (request, h) => {
        return h.response({ message: "server says hello" });
    }
};


const Private = {
    path: '/login',
    method: 'POST',
    config: {
        auth: false,
    },
    handler: async (request, h) => {
        request.cookieAuth.set({ sid: 20 });
        return h.response({ message: 'okay'});
    }
};

export default [
    IndexRoute,
    Private,
    ...TestRoutes,
];
