const {fcm , message} = require("../config/fcm_push_notification");


const pushNotify = fcm.send(message,(err, response) => {
  if (err) {
    console.log("Something has gone wrong!");
  } else {
    console.log("Successfully sent with response: ", response);
  }
});


