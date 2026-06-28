const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    dashboard,
    addUser,
    allUsers,
    owners,
    deleteUser
} = require("../controllers/adminController");

router.get(
    "/dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    dashboard
);

router.post(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    addUser
);

router.get(
    "/users",
    authMiddleware,
    roleMiddleware("admin"),
    allUsers
);

router.get(
    "/owners",
    authMiddleware,
    roleMiddleware("admin"),
    owners
);

router.delete(
    "/users/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteUser
);

module.exports = router;