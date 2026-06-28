const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
    addRating,
    editRating
} = require("../controllers/ratingController");

router.post(
    "/",
    authMiddleware,
    roleMiddleware("user"),
    addRating
);

router.put(
    "/:storeId",
    authMiddleware,
    roleMiddleware("user"),
    editRating
);

module.exports = router;