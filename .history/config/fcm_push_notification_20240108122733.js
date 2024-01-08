const FCM = require("fcm-node");
const config = require("../config/config");

const server_key = config.server_key;
const device_key = config.device_key;

const fcm = new FCM(server_key);

const message = {
  notification: {
    title: "Title of your push notification",
    body: "Body of your push notification",
  },
  to: device_key,
};



module.exports = {fcm ;
