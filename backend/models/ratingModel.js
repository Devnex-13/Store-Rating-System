const db = require("../config/db");

const checkExistingRating = (userId, storeId, callback) => {

    const sql = `
        SELECT * FROM ratings
        WHERE user_id = ? AND store_id = ?
    `;

    db.query(sql, [userId, storeId], callback);

};

const createRating = (userId, storeId, rating, callback) => {

    const sql = `
        INSERT INTO ratings
        (user_id, store_id, rating)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [userId, storeId, rating], callback);

};

const updateRating = (userId, storeId, rating, callback) => {

    const sql = `
        UPDATE ratings
        SET rating = ?
        WHERE user_id = ? AND store_id = ?
    `;

    db.query(sql, [rating, userId, storeId], callback);

};

module.exports = {
    checkExistingRating,
    createRating,
    updateRating
};