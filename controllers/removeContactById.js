const Contact = require("../models/contact");
const createError = require("http-errors");

const removeById = async (req, res, next) => {
	try {
		const result = await Contact.findByIdAndDelete(req.params.id);
		if (!result) {
			throw createError(
				404,
				`Contact with id ${req.params.id} not found`
			);
		}
		res.status(200).json({
			status: "success",
			code: 200,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = removeById;
