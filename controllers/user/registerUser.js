const CreateError = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");

const register = async (req, res, next) => {
	try {
		const { password, email, subscription = "starter" } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			throw new CreateError(
				409,
				`User with email ${email} already exists`
			);
		}

		/*Simple version*/

		// const salt = bcrypt.genSaltSync(10);
		// const hashPassword = bcrypt.hashSync(password, salt);
		// await User.create({ password: hashPassword, email, subscription });

		/*Complex version useing User Class */

		const newUser = new User({ email, subscription });
		newUser.setPassword(password);
		newUser.save();

		res.status(201).json({
			user: { email, subscription },
		});
	} catch (error) {
		next(error);
	}
};

module.exports = register;
