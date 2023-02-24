const express = require("express");
const { verify } = require("jsonwebtoken");
const userCtrl = require("../../controllers/user");
const { validation, auth, upload } = require("../../middlewares/");
const {
	userRegisterSchema,
	userLoginSchema,
	emailVerifySchema,
} = require("../../schemas");

const router = express.Router();

router.get("/current", auth, userCtrl.current);

router.get("/logout", auth, userCtrl.logout);

router.post(
	"/verify",
	validation(emailVerifySchema),
	userCtrl.repeatVerifyEmail
);

router.get("/verify/:verificationToken", userCtrl.verifyEmail);

router.post("/register", validation(userRegisterSchema), userCtrl.register);

router.post("/login", validation(userLoginSchema), userCtrl.login);

router.patch("/avatars", auth, upload.single("avatar"), userCtrl.updateAvatar);

module.exports = router;
