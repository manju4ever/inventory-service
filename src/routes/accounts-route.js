import Joi from '@hapi/joi';
import AccountsController from '~/controllers/AccountsController';

export default [{
    path: '/register',
    method: 'POST',
    config: {
        description: 'Register a new user',
        tags: ['api', 'account'],
        validate: {
            payload: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(30).required(),
            }),
        },
        handler: AccountsController.register,
    }
}, {
    path: '/login',
    method: 'POST',
    config: {
        description: 'This is to authenticate a user',
        tags: ['api', 'account'],
        validate: {
            payload: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().min(8).max(30).required(),
            }).label('Login'),
        },
    },
    handler: AccountsController.login,
}];