const express = require("express");
const bookCtrl = require("../../controllers");
const { validation } = require("../../middlewares/");
const { contactAddSchema, contactUpdateSchema } = require("../../schemas");

const router = express.Router();

router.get("/", bookCtrl.getAll);

router.get("/:id", bookCtrl.getById);

router.post("/", validation(contactAddSchema), bookCtrl.add);

router.put("/:id", validation(contactAddSchema), bookCtrl.updateById);

router.patch(
	"/:id/favorite",
	validation(contactUpdateSchema),
	bookCtrl.updateStatusById
);

router.delete("/:id", bookCtrl.removeById);

module.exports = router;
