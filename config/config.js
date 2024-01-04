const dotenv = require('dotenv');
const assert = require('assert');

dotenv.config();

const {NODE_ENV,
PORT,
FRONTEND } = process.env;

// assert(PORT, "Port is required");
// assert(HOST, "Host is required");

module.exports = {
  port : PORT
};