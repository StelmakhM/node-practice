const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
	try {
		const contacts = await fs.readFile(contactsPath, "utf8");
		return JSON.parse(contacts);
	} catch (error) {
		console.log(error);
	}
};

const getContactById = async (contactId) => {
	try {
		const contacts = await fs.readFile(contactsPath, "utf8");
		const parsedContacts = JSON.parse(contacts);
		const [contact] = parsedContacts.filter(
			(contact) => contact.id === contactId
		);
		return contact;
	} catch (error) {
		console.log(error);
	}
};

const removeContact = async (contactId) => {
	const contacts = await fs.readFile(contactsPath, "utf8");
	const parsedContacts = JSON.parse(contacts);
	const isIdExist = parsedContacts.some(
		(contact) => contact.id === contactId
	);
	if (!isIdExist) return;
	const newContactsList = parsedContacts.filter(
		(contact) => contact.id !== contactId
	);
	await fs.writeFile(contactsPath, JSON.stringify(newContactsList), "utf8");
	return contacts;
};

const addContact = async (body) => {
	const contacts = await fs.readFile(contactsPath, "utf8");
	const parsedContacts = JSON.parse(contacts);
	const newContactsList = JSON.stringify([...parsedContacts, body]);
	await fs.writeFile(contactsPath, newContactsList, "utf8");
};

const updateContact = async (contactId, body) => {
	const { name, phone, email } = body;
	const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
	const isIsExist = contacts.some((contact) => contact.id === contactId);
	if (!isIsExist) return;

	contacts.forEach((contact) => {
		if (contact.id === contactId) {
			contact.name = name;
			contact.email = email;
			contact.phone = phone;
		}
	});

	await fs.writeFile(contactsPath, JSON.stringify(contacts));

	return { id: contactId, ...body };
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
