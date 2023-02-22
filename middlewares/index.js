const { validation } = require("./validation");
const { isIdValid } = require("./isIdValid");
const { auth } = require("./auth");
const { upload } = require("./upload");

module.exports = {
	validation,
	isIdValid,
	auth,
	upload,
};
