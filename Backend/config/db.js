const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const config = {
  host: process.env.DB_SERVER, // MySQL host
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Database Connection Failed!", err);
    throw err;
  }
  if (connection) connection.release();
  console.log("Connected to MySQL");
});

module.exports = pool;
