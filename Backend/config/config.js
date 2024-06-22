require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  dbConfig: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
  },
};
