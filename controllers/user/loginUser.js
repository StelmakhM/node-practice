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
		if (!user.verify) {
			throw new CreateError(401, "Email is not verified yet");
		}

		const token = jwt.sign({ id: user._id }, SECRET_KEY);
		await User.findByIdAndUpdate(user.id, { token });
		res.status(200).json({
			status: "success",
			code: 200,
			data: {
				email: user.email,
				subscription: user.subscription,
				token,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = login;
