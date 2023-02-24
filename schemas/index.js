const { contactAddSchema, contactUpdateSchema } = require("./contact");
const {
	userRegisterSchema,
	userLoginSchema,
	emailVerifySchema,
} = require("./user");

module.exports = {
	contactAddSchema,
	contactUpdateSchema,
	userRegisterSchema,
	userLoginSchema,
	emailVerifySchema,
};
