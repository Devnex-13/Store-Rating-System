const { getDashboardData } = require("../models/adminModel");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByEmail,
  getUsers,
  getOwners,
  deleteUserById
} = require("../models/userModel");

const dashboard = (req, res) => {
  getDashboardData((err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);
  });
};

const addUser = (req, res) => {
  findUserByEmail(req.body.email, async (err, result) => {
    if (err) {
      console.log("MySQL Error:", err);
      return res.status(500).json({
        message: err.message,
        code: err.code,
      });
    }

    if (result.length > 0)
      return res.status(400).json({
        message: "Email already exists",
      });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    createUser(userData, (err) => {
      if (err) {
        console.log("Create User Error:", err);

        return res.status(500).json({
          message: err.message,
          error: err,
        });
      }

      res.status(201).json({
        message: "User Created Successfully",
      });
    });
  });
};

const allUsers = (req, res) => {
  const search = req.query.search || "";

  getUsers(search, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};

const owners = (req, res) => {

    getOwners((err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

const deleteUser = (req, res) => {

    deleteUserById(req.params.id, (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            message: "User deleted successfully"
        });

    });

};

module.exports = {
  dashboard,
  addUser,
  allUsers,
  owners,
  deleteUser
};
