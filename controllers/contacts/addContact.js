const { Contact } = require("../../models");

const add = async (req, res, next) => {
	try {
		const result = await Contact.create(req.body);
		res.status(201).json({
			status: "success",
			code: 201,
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = add;