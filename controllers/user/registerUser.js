const CreateError = require("http-errors");
// const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { token } = require("morgan");

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

		const avatarURL = gravatar.url(email);
		const verificationToken = nanoid();

		/*Simple version*/

		// const salt = bcrypt.genSaltSync(10);
		// const hashPassword = bcrypt.hashSync(password, salt);
		// await User.create({ password: hashPassword, email, subscription });

		/*Complex version useing User Class */
		const newUser = new User({
			email,
			subscription,
			avatarURL,
			verificationToken,
		});
		newUser.setPassword(password);
		newUser.save();

		sendEmail(email, verificationToken);

		res.status(201).json({
			user: { email, subscription },
		});
	} catch (error) {
		next(error);
	}
};

module.exports = register;
