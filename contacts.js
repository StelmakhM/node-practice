/*CommonJS import*/

// const fs = require("fs");
// const path = require("path");

/*ES6 import*/

import fs from "fs";
import path from "path";

const contactsPath = path.normalize("db/contacts.json");

export function listContacts() {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		console.log(data);
	});
}

export function getContactById(contactId) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const filteredContact = JSON.parse(data).filter(
			(contact) => Number(contact.id) === contactId
		);
		console.log(filteredContact);
	});
}

export function removeContact(contactId) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const contacts = JSON.parse(data).filter(
			(contact) => Number(contact.id) !== contactId
		);

		fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(
				`Contact with ID ${contactId} was successfully removed`
			);
		});
	});
}

export function addContact(name, email, phone) {
	fs.readFile(contactsPath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
			return;
		}
		const contacts = JSON.parse(data);
		contacts.push({ name, email, phone });

		fs.writeFile(contactsPath, JSON.stringify(contacts), (err) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(`Contact with name ${name} successfully added`);
		});
	});
}

/*CommonJS export*/
// module.exports = { listContacts, getContactById, removeContact, addContact };
