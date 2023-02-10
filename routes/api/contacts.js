const express = require("express");
const nanoId = require("nanoid");
const router = express.Router();
const {
	addContact,
	getContactById,
	listContacts,
	removeContact,
	updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res) => {
	const contacts = await listContacts();
	return res.status(200).json(contacts);
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const contact = await getContactById(id);
	if (!contact) {
		return res.status(404).json({ message: "Not found" });
	}
	return res.status(200).json(contact);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const contacts = await removeContact(id);
	if (!contacts) {
		return res.status(404).json({ message: "Not found" });
	}
	return res.status(200).json({ message: "contact deleted" });
});

router.post("/", async (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		return res.status(400).json({ message: "missing required field" });
	}
	const newContact = { name, email, phone, id: nanoId() };
	await addContact(newContact);
	return res.status(201).json(newContact);
});

router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { body } = req;
	const { name, email, phone } = body;
	if (!name || !email || !phone) {
		return res.status(400).json({ message: "missing fields" });
	}
	const updatedContact = await updateContact(id, body);
	if (!updatedContact) {
		return res.status(404).json({ message: "Not found" });
	}
	return res.status(200).json(updatedContact);
});

module.exports = router;
