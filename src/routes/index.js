import TestRoutes from './test-route';

const IndexRoute = {
  path: '/',
  method: 'GET',
  config: {
    description: "This route is the root of all beautiful things yet to happen",
    tags: ["api"],
  },
  handler: async (request, h) => h.response({ message: 'Welcome to Hapi.js Test Server' }),
};


const Private = {
  path: '/login',
  method: 'POST',
  handler: async (request, h) => {
    request.cookieAuth.set({ sid: 20 });
    return h.response({ message: 'okay' });
  },
};

export default [
  IndexRoute,
  Private,
  ...TestRoutes,
];
