import TestRoutes from "./test-route";

const IndexRoute = {
    path: '/',
    method: 'GET',
    handler: async (request, h) => {
        return h.response({ message: "server says hello" });
    }
};

export default [
    IndexRoute,
    ...TestRoutes,
];
