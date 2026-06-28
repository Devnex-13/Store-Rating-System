const express = require("express");

const router = express.Router();

const {
    createStore,
    getStores,
    userStores,
    adminStores,
    deleteStore
} = require("../controllers/storeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("admin"),
    createStore
);

router.get(
    "/",
    authMiddleware,
    getStores
);

router.get(
    "/user",
    authMiddleware,
    roleMiddleware("user"),
    userStores
);

router.get(
    "/admin",
    authMiddleware,
    roleMiddleware("admin"),
    adminStores
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("admin"),
    deleteStore
);

module.exports = router;