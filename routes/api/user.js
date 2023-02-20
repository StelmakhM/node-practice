const express = require("express");
const userCtrl = require("../../controllers/user");
const { validation, auth } = require("../../middlewares/");
const { userRegisterSchema, userLoginSchema } = require("../../schemas");

const router = express.Router();

router.post("/register", validation(userRegisterSchema), userCtrl.register);

router.post("/login", validation(userLoginSchema), userCtrl.login);

router.get("/current", auth, userCtrl.current);

router.get("/logout", auth, userCtrl.logout);

module.exports = router;
