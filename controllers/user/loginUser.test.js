const request = require("supertest");
const app = require("../../app");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;
require("../../server");

describe("loginUser controller", () => {
	test("/login POST request status code = 200", async () => {
		const response = await request(app)
			.post("/api/users/login")
			.send({ email: "123@mail.com", password: "123" });

		expect(response.status).toBe(200);
	});

	test("/login POST request returns valid token", async () => {
		const response = await request(app)
			.post("/api/users/login")
			.send({ email: "123@mail.com", password: "123" });

		const { token } = response.body.data;
		expect(jwt.verify(token, SECRET_KEY)).toBeTruthy();
	});

	test("/login POST request returns email && subscription fields", async () => {
		const response = await request(app)
			.post("/api/users/login")
			.send({ email: "123@mail.com", password: "123" });

		expect(response.body.data).toHaveProperty("email");
		expect(response.body.data).toHaveProperty("subscription");
	});

	test("/login POST request email && subscription fields are strings", async () => {
		const response = await request(app)
			.post("/api/users/login")
			.send({ email: "123@mail.com", password: "123" });

		expect(typeof response.body.data.email).toBe("string");
		expect(typeof response.body.data.subscription).toBe("string");
	});
});
