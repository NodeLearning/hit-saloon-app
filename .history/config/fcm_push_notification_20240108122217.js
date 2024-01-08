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

fcm.send(message, function (err, response) {
  if (err) {
    console.log("Something has gone wrong!");
  } else {
    console.log("Successfully sent with response: ", response);
  }
});

module.exports = fcm ;
