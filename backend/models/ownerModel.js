const db = require("../config/db");

const getOwnerDashboard = (ownerId, callback) => {

    const sql = `
        SELECT
            s.id,
            s.name AS storeName,
            s.address,
            AVG(r.rating) AS averageRating,
            COUNT(r.id) AS totalRatings
        FROM stores s
        LEFT JOIN ratings r
            ON s.id = r.store_id
        WHERE s.owner_id = ?
        GROUP BY s.id;
    `;

    db.query(sql, [ownerId], callback);

};

const getStoreRatings = (ownerId, callback) => {

    const sql = `
        SELECT
            u.name,
            u.email,
            r.rating
        FROM ratings r
        JOIN users u
            ON r.user_id = u.id
        JOIN stores s
            ON r.store_id = s.id
        WHERE s.owner_id = ?;
    `;

    db.query(sql, [ownerId], callback);

};

module.exports = {
    getOwnerDashboard,
    getStoreRatings
};