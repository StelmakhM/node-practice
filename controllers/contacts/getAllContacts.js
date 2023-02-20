const { Contact } = require("../../models");

const getAll = async (req, res, next) => {
	try {
		const { _id } = req.user;
		const { page = 1, limit = 10 } = req.query;
		console.log(req.query);
		const skip = (page - 1) * limit;
		const result = await Contact.find({ owner: _id }, "", {
			skip,
			limit: Number(limit),
		}).populate("owner", "_id email");
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
