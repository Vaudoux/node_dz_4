const Joi = require('joi');

const userData = Joi.object({
    firstName: Joi.string().min(1).required(),
    secondName: Joi.string().min(1).required(),
    age: Joi.number().min(1).max(150).required(),
    city: Joi.string().min(1),
});

const idData = Joi.object({
    id: Joi.number().required(),
});

module.exports = {idData, userData};