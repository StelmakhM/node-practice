const CreateError = require("http-errors");
const { User } = require("../../models");

const current = async (req, res, next) => {
	console.log(req.user);
	res.send();
};

module.exports = current;
