const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false, timestamps: true }
);

const handleError = (error, data, next) => {
	const { name } = error;
	if (name === "ValidationError") {
		error.status = 400;
	}
	next();
};

contactSchema.post("save", handleError);

const Contact = model("contact", contactSchema);

module.exports = { Contact };
