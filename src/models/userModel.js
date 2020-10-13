const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			default: "ploni",
			validate(value) {
				if (value.trim().toLowerCase() === "moshe") {
					throw new Error("Name could not be MOSHE!!!!");
				}
			},
		},
		age: {
			type: Number,
			required: true,
			min: 12,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error("Invalid email");
				}
			},
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 7,
			validate(value) {
				const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/;
				if (!passRegex.test(value)) {
					throw new Error("password must contain big and small characters and numbers");
				}
			},
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
