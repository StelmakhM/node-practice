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
const contactsSchema = require("../../middlewares/validation");

router.get("/", async (req, res) => {
	try {
		const contacts = await listContacts();
		return res.status(200).json(contacts);
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const contact = await getContactById(id);
		if (!contact) {
			return res.status(404).json({ message: "Not found" });
		}
		return res.status(200).json(contact);
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const contacts = await removeContact(id);
		if (!contacts) {
			return res.status(404).json({ message: "Not found" });
		}
		return res.status(200).json({ message: "contact deleted" });
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = contactsSchema.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const { name, email, phone } = req.body;
		const newContact = { name, email, phone, id: nanoId() };
		await addContact(newContact);
		return res.status(201).json(newContact);
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const { error } = contactsSchema.validate(req.body);
		if (error) {
			error.status = 400;
			throw error;
		}
		const updatedContact = await updateContact(id, req.body);
		if (!updatedContact) {
			return res.status(404).json({ message: "Not found" });
		}
		return res.status(200).json(updatedContact);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
