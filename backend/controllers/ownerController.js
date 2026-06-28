const {
    getOwnerDashboard,
    getStoreRatings
} = require("../models/ownerModel");

const dashboard = (req, res) => {

    const ownerId = req.user.id;

    getOwnerDashboard(ownerId, (err, dashboardData) => {

        if (err)
            return res.status(500).json(err);

        getStoreRatings(ownerId, (err, ratingsData) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                dashboard: dashboardData,
                ratings: ratingsData
            });

        });

    });

};

module.exports = {
    dashboard
};