const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
	const { path: tempUpload, originalname } = req.file;
	const { id } = req.user;
	console.log(req.user);
	try {
		const resultUpload = path.join(avatarsDir, `${id}${originalname}`);
		await fs.rename(tempUpload, resultUpload);
		const avatarURL = path.join(
			"public",
			"avatars",
			`${id}${originalname}`
		);
		await User.findByIdAndUpdate(id, { avatarURL });
		res.status(200).json(avatarURL);
	} catch (error) {
		fs.unlink(tempUpload);
		next(error);
	}
};

module.exports = updateAvatar;
