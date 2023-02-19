const express = require("express");
const userCtrl = require("../../controllers/user");
const { validation } = require("../../middlewares/");
const { userRegisterSchema, userLoginSchema } = require("../../schemas");

const router = express.Router();

router.post("/register", validation(userRegisterSchema), userCtrl.register);

router.post("/login", validation(userLoginSchema), userCtrl.login);

module.exports = router;
