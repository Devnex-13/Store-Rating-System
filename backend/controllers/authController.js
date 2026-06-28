const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  
  findUserByEmail(req.body.email, async (err, result) => {

    if (err) {
        return res.status(500).json({
            message: "Database Error"
        });
    }

    if (result.length > 0) {
        return res.status(400).json({
            message: "Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
        ...req.body,
        password: hashedPassword,
        role: "user"
    };

    createUser(userData, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        res.status(201).json({
            message: "User Registered Successfully"
        });

    });

});
}

const login = (req, res) => {

    findUserByEmail(req.body.email, async (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.json({
            message: "Login Successful",
            token,
            user
        });

    });

};

module.exports = {
    register,
    login
};