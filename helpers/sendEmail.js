const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);

const sendEmail = (recipient, verificationToken) => {
	const msg = {
		to: recipient,
		from: "stelmakh1994@gmail.com",
		subject: "Token verification",
		html: `<a href='http://localhost:3000/api/users/verify/${verificationToken}'>Click to confirm email</a>`,
	};
	sgMail
		.send(msg)
		.then(() => {
			console.log("Email sent");
		})
		.catch((error) => {
			console.error(error);
		});
};

module.exports = sendEmail;
