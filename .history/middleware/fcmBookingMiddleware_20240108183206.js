// pushNotify.js
const { fcm, message } = require("../config/fcm_push_notification");

function sendNotification() {
  return new Promise((resolve, reject) => {
    fcm.send(message, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

async function pushNotify() {
  try {
    const response = await sendNotification();
    console.log("Successfully sent with response: ", response);
  } catch (err) {
    console.log("Something has gone wrong!", err);
  }
}

module.exports = pushNotify;



    //
    // fcm.send(message, (err, response) => {
    //   if (err) {
    //     console.log("Something has gone wrong!");
    //   } else {
    //     console.log("Successfully sent with response: ", response);
    //   }
    // });

    //