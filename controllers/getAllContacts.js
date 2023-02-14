const Contact = require("../models/contact");

const getAll = async (req, res, next) => {
	try {
		const result = await Contact.find();
		res.json({
			status: "success",
			code: 200,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getAll;