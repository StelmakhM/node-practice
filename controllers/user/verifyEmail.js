const { User } = require("../../models");
const CreateError = require("http-errors");

const verifyEmail = async (req, res, next) => {
	try {
		const { verificationToken } = req.params;
		const user = await User.findOne({ verificationToken });
		if (!user) {
			throw new CreateError(404, `User with email ${email} found`);
		}
		await User.findByIdAndUpdate(user._id, {
			verificationToken: null,
			verify: true,
		});

		res.status(200).json({
			message: "Verification successful",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = verifyEmail;
