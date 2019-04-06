import TestController from '~/controllers/TestController';
import { Test as TestSchema } from '~/schemas';

export default [
  {
    path: '/test',
    method: 'POST',
    config: {
      description: 'Push something to test',
      tags: ['api', 'test'],
      validate: {
        payload: TestSchema,
      },
    },
    handler: TestController.testMe,
  },
];
