const dotenv = require("dotenv");

dotenv.config();

};
const { NODE_ENV, PORT, FRONTEND, FIREBASE_SERVER_KEY , } = process.env;

module.exports = {
  port: PORT,
  server_key: FIREBASE_SERVER_KEY,
  device_key: FIREBASE_DEVICE_KEY
};
