const express = require("express");
const bookCtrl = require("../../controllers");
const { validation, isIdValid } = require("../../middlewares/");
const { contactAddSchema, contactUpdateSchema } = require("../../schemas");

const router = express.Router();

router.get("/", bookCtrl.getAll);

router.get("/:id", isIdValid, bookCtrl.getById);

router.post("/", validation(contactAddSchema), bookCtrl.add);

router.put(
	"/:id",
	isIdValid,
	validation(contactAddSchema),
	bookCtrl.updateById
);

router.patch(
	"/:id/favorite",
	isIdValid,
	validation(contactUpdateSchema),
	bookCtrl.updateStatusById
);

router.delete("/:id", isIdValid, bookCtrl.removeById);

module.exports = router;
