const db = require("../config/db");

const createUser = (userData, callback) => {

    const sql = `
        INSERT INTO users
        (name,email,address,password,role)
        VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            userData.name,
            userData.email,
            userData.address,
            userData.password,
            userData.role
        ],
        callback
    );
};

const findUserByEmail = (email, callback) => {

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);

};

const getUsers = (search, callback) => {

    const sql = `
        SELECT
            id,
            name,
            email,
            address,
            role
        FROM users
        WHERE
            name LIKE ?
            OR email LIKE ?
            OR role LIKE ?
        ORDER BY name ASC
    `;

    const keyword = `%${search}%`;

    db.query(sql, [keyword, keyword, keyword], callback);

};

const deleteUserById = (id, callback) => {

    const sql = `
        DELETE FROM users
        WHERE id = ?
    `;

    db.query(sql, [id], callback);

};

const getOwners = (callback) => {

    const sql = `
        SELECT id, name
        FROM users
        WHERE role = 'owner'
        ORDER BY name
    `;

    db.query(sql, callback);

};

module.exports = {
    createUser,
    findUserByEmail,
    getUsers,
    getOwners,
    deleteUserById
};