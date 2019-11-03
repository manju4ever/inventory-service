import Joi from '@hapi/joi';

export default Joi.object().keys({
  name: Joi.string().min(3).max(100).required()
    .description('Full name of the user'),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(30).required(),
}).label('RegistrationDetails');
