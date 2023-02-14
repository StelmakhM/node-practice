const express = require("express");
const bookService = require("../../controllers");
const { validation } = require("../../middlewares/");
const { contactAddSchema, contactUpdateSchema } = require("../../schemas");

const router = express.Router();

router.get("/", bookService.getAll);

router.get("/:id", bookService.getById);

router.post("/", validation(contactAddSchema), bookService.add);

router.put("/:id", validation(contactAddSchema), bookService.updateById);

router.patch(
	"/:id/favorite",
	validation(contactUpdateSchema),
	bookService.updateStatusById
);

router.delete("/:id", bookService.removeById);

module.exports = router;
