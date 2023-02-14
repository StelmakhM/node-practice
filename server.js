const mongoose = require("mongoose");
const app = require("./app");
require("dotenv").config();

const { PORT = 3000 } = process.env;
const DB_HOST = process.env.DB_HOST;

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", true);
const connection = mongoose.connect(DB_HOST);

connection
	.then(() => {
		console.log("Database connection successful");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(`Server not running. Error message: ${err.message}`);
		process.exit(1);
	});
