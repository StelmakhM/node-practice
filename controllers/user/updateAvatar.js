const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
	const { path: tempUpload, originalname } = req.file;
	const { id } = req.user;
	try {
		const resultUpload = path.join(avatarsDir, originalname);
		await fs.rename(tempUpload, resultUpload);
		const avatarURL = path.join("public", "avatars", originalname);
		await User.findByIdAndUpdate(id, { avatarURL });
		res.status(200).json(avatarURL);
	} catch (error) {
		fs.unlink(tempUpload);
		next(error);
	}
};

module.exports = updateAvatar;
