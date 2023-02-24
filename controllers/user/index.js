const register = require("./registerUser");
const login = require("./loginUser");
const current = require("./getCurrentUser");
const logout = require("./logoutUser");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const repeatVerifyEmail = require("./repeatVerifyEmail");

module.exports = {
	register,
	login,
	current,
	logout,
	updateAvatar,
	verifyEmail,
	repeatVerifyEmail,
};
