const { User } = require("../../models");
const CreateError = require("http-errors");
const { sendEmail } = require("../../helpers");

const repeatVerifyEmail = async (req, res, next) => {
	try {
		const { email } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new CreateError(404, `User with email: ${email} not found`);
		}
		if (user.verify) {
			throw new CreateError(400, "Verification has already been passed");
		}
		sendEmail(email, user.verificationToken);
		res.status(200).json({
			message: `Verification link has been send to your email ${email}`,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = repeatVerifyEmail;
