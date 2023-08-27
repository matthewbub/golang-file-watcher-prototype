const Joi = require('joi')

const userSchema = Joi.object({
  id: Joi.string().required(),
  created_at: Joi.date().required(),
  updated_at: Joi.date().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required()
});

