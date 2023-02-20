const express = require("express");
const bookCtrl = require("../../controllers/contacts");
const { validation, isIdValid, auth } = require("../../middlewares/");
const { contactAddSchema, contactUpdateSchema } = require("../../schemas");

const router = express.Router();

router.get("/", auth, bookCtrl.getAll);

router.get("/:id", auth, isIdValid, bookCtrl.getById);

router.post("/", auth, validation(contactAddSchema), bookCtrl.add);

router.put(
	"/:id",
	auth,
	isIdValid,
	validation(contactAddSchema),
	bookCtrl.updateById
);

router.patch(
	"/:id/favorite",
	auth,
	isIdValid,
	validation(contactUpdateSchema),
	bookCtrl.updateStatusById
);

router.delete("/:id", isIdValid, bookCtrl.removeById);

module.exports = router;
