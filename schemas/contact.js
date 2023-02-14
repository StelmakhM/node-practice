const Joi = require("joi");

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email(),
	phone: Joi.number().required(),
	favorite: Joi.bool(),
});
const contactUpdateSchema = Joi.object({
	favorite: Joi.bool().required(),
});

module.exports = {
	contactAddSchema,
	contactUpdateSchema,
};
