const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already exists!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({ ...req.body, password: hashPassword });
		await newUser.save();

		const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_PRIVATE_KEY); // Sign the JWT
		res.status(201).send({ data: token, message: "User created successfully" });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;