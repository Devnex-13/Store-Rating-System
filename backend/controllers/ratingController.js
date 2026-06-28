const {
    checkExistingRating,
    createRating,
    updateRating
} = require("../models/ratingModel");

const addRating = (req, res) => {

    const userId = req.user.id;
    const { storeId, rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    checkExistingRating(userId, storeId, (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length > 0) {
            return res.status(400).json({
                message: "You already rated this store"
            });
        }

        createRating(userId, storeId, rating, (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message: "Rating Added Successfully"
            });

        });

    });

};

const editRating = (req, res) => {

    const userId = req.user.id;
    const storeId = req.params.storeId;
    const { rating } = req.body;

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            message: "Rating must be between 1 and 5"
        });
    }

    updateRating(userId, storeId, rating, (err) => {

        if (err)
            return res.status(500).json(err);

        res.json({
            message: "Rating Updated Successfully"
        });

    });

};

module.exports = {
    addRating,
    editRating
};