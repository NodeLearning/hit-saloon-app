const dotenv = require("dotenv");

dotenv.config();

const { NODE_ENV, PORT, FRONTEND } = process.env;

module.exports = {
  port: PORT,
};
