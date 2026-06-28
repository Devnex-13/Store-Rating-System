require("dotenv").config();
const mysql = require("mysql2");
console.log("HOST:", process.env.DB_HOST);
console.log("PORT:", process.env.DB_PORT);
console.log("USER:", process.env.DB_USER);
console.log("DB:", process.env.DB_NAME);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed!");
        console.log(err);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});

module.exports = db;