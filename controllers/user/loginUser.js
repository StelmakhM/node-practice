const CreateError = require("http-errors");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		/*Simple version */

		// const comparePassword = bcrypt.compareSync(password, user.password);
		// if (!user || !comparePassword) {
		// 	throw new CreateError(401, "Email or password is wrong");
		// }

		/*Complex version using User Class methods*/

		if (!user || !user.comparePassword(password)) {
			throw new CreateError(401, "Email or password is wrong");
		}

		const token = jwt.sign({ id: user._id }, SECRET_KEY);
		res.status(200).json({
			status: "success",
			code: 200,
			data: {
				token,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = login;
