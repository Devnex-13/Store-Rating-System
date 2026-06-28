const db = require("../config/db");

const getDashboardData = (callback) => {

    const sql = `
        SELECT
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM stores) AS totalStores,
        (SELECT COUNT(*) FROM ratings) AS totalRatings
    `;

    db.query(sql, callback);

};

module.exports = {
    getDashboardData
};