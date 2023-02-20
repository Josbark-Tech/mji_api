require("dotenv").config({ path : "../.env"});

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || process.env.DB_HOST_LOCAL,
  DB_USER: process.env.DB_USER || process.env.DB_USER_LOCAL,
  DB_PASS: process.env.DB_PASS || process.env.DB_PASS_LOCAL,
  DB_NAME: process.env.DB_NAME || process.env.DB_NAME_LOCAL,
  DB_PORT: process.env.DB_PORT || 3306,
  DB_CHARSET: process.env.DB_CHARSET || "utf8",
  DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT || 10,
};