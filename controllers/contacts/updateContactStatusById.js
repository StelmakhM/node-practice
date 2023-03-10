const { Contact } = require("../../models");

const createError = require("http-errors");

const updateStatusById = async (req, res, next) => {
	try {
		const result = await Contact.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
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

module.exports = updateStatusById;
