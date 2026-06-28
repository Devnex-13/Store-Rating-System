const db = require("../config/db");

const addStore = (storeData, callback) => {

    const sql = `
        INSERT INTO stores
        (name,email,address,owner_id)
        VALUES (?,?,?,?)
    `;

    db.query(
        sql,
        [
            storeData.name,
            storeData.email,
            storeData.address,
            storeData.owner_id
        ],
        callback
    );

};

const getAllStores = (callback) => {

    const sql = `
        SELECT
            stores.id,
            stores.name,
            stores.email,
            stores.address,
            users.name AS ownerName
        FROM stores
        LEFT JOIN users
        ON stores.owner_id = users.id
    `;

    db.query(sql, callback);

};

const getStoresForUser = (userId, search, callback) => {

    const sql = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,

            IFNULL(AVG(r.rating),0) AS averageRating,

            (
                SELECT rating
                FROM ratings
                WHERE
                    user_id = ?
                    AND store_id = s.id
            ) AS userRating

        FROM stores s

        LEFT JOIN ratings r
            ON s.id = r.store_id

        WHERE

            s.name LIKE ?
            OR s.address LIKE ?

        GROUP BY s.id
    `;

    const keyword = `%${search}%`;

    db.query(
        sql,
        [userId, keyword, keyword],
        callback
    );

};

const getAllStoresAdmin = (search, callback) => {

    const sql = `
        SELECT
            s.id,
            s.name,
            s.email,
            s.address,
            u.name AS ownerName,
            IFNULL(AVG(r.rating),0) AS averageRating

        FROM stores s

        LEFT JOIN users u
            ON s.owner_id = u.id

        LEFT JOIN ratings r
            ON s.id = r.store_id

        WHERE
            s.name LIKE ?
            OR s.email LIKE ?
            OR s.address LIKE ?

        GROUP BY s.id

        ORDER BY s.name ASC
    `;

    const keyword = `%${search}%`;

    db.query(
        sql,
        [keyword, keyword, keyword],
        callback
    );

};

const deleteStoreById = (id, callback) => {

    const sql = `
        DELETE FROM stores
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

module.exports = {
    addStore,
    getAllStores,
    getStoresForUser,
    getAllStoresAdmin,
    deleteStoreById
};