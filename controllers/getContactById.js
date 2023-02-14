const Contact = require("../models/contact");
const createError = require("http-errors");

const getById = async (req, res, next) => {
	try {
		const result = await Contact.findById(req.params.id);
		if (!result) {
			throw createError(
				404,
				`Contact with id ${req.params.id} not found`
			);
		}
		res.json({
			status: "success",
			code: 200,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getById;
