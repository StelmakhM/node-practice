const Joi = require("joi");

const contactsSchema = Joi.object({
	name: Joi.string().required(),
	phone: Joi.number().required(),
	email: Joi.string()
		.email({
			minDomainSegments: 1,
			tlds: false,
		})
		.required(),
});

module.exports = contactsSchema;
