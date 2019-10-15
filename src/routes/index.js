import ProductRoutes from './products-route';

const IndexRoute = {
  path: '/',
  method: 'GET',
  config: {
    description: "This is an entrypoint to beauty.",
    tags: ["api"],
  },
  handler: async (request, h) => h
    .response({ message: `Hey there buddy, i'm a simple inventory service. I speak HTTP !` })
    .header('Content-Type', 'application/json'),
};

export default [
  IndexRoute,
  ...ProductRoutes,
];
