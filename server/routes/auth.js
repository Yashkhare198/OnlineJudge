const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library


router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            console.error("Validation Error:", error);
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            console.error("User not found for email:", req.body.email);
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.error("Invalid password for user:", req.body.email);
            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_PRIVATE_KEY);
        res.status(200).send({ data: token, userId: user.id, message: "Logged in successfully" });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;