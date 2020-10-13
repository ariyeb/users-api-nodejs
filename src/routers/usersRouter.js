const express = require("express");
const User = require("../models/userModel");

const router = new express.Router();

router.post("/users/new", async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(400).send({
			status: 400,
			message: err.message,
		});
	}
});

router.get("/users/get", async (req, res) => {
	const _id = req.query.id;
	try {
		const user = await User.findById(_id);
		if (!user) {
			return res.status(404).send({
				status: 404,
				message: "wrong id",
			});
		}

		res.send(user);
	} catch (err) {
		res.status(500).send(err);
	}
});

// צרו ראוט לקבלת כל היוזרים

module.exports = router;
