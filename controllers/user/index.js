const register = require("./registerUser");
const login = require("./loginUser");
const current = require("./getCurrentUser");
const logout = require("./logoutUser");

module.exports = {
	register,
	login,
	current,
	logout,
};
