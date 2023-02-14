const add = require("./addContact");
const getAll = require("./getAllContacts");
const getById = require("./getContactById");
const updateById = require("./updateContactById");
const removeById = require("./removeContactById");
const updateStatusById = require("./updateContactStatusById");

module.exports = {
	add,
	getAll,
	getById,
	removeById,
	updateById,
	updateStatusById,
};
