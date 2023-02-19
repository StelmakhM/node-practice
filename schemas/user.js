const Joi = require("joi");

const userRegisterSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().required(),
	subscription: Joi.string().valid("starter", "pro", "business"),
});

const userLoginSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().required(),
});
module.exports = {
	userRegisterSchema,
	userLoginSchema,
};
