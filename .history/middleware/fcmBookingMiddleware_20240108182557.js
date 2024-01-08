const { fcm, message } = require("../config/fcm_push_notification");

async function pushNotify() {
  try {
    const response = await fcm.send(message);
    console.log("Successfully sent with response: ", response);
  } catch (err) {
    console.log("Something has gone wrong!", err);
  }
}

module.exports = pushNotify;
