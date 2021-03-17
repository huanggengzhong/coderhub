const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config();

const PRIVATE_KEY = fs.readFileSync(
  path.resolve(__dirname, "./key/private.key")
);
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./key/public.key"));

const AUTH_TIME = 60 * 60 * 24;

module.exports = {
  APP_PORT,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;

// 单独添加写在后面

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
module.exports.AUTH_TIME = AUTH_TIME;
