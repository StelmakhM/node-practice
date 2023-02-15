const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

const isIdValid = (req, res, next) => {
	const { id } = req.params;
	if (!isValidObjectId(id)) {
		const error = createError(400, `${id} is not correct id format`);
		next(error);
	}
	next();
};

module.exports = { isIdValid };
