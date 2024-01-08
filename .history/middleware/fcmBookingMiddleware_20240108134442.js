const {fcm , message} = require("../config/fcm_push_notification");

fcm.send(message,(err, response) => {
  if (err) {
    console.log("Something has gone wrong!");
  } else {
    console.log("Successfully sent with response: ", response);
  }
});

fcm.subscribeToTopic(
  ["device_token_1", "device_token_2"],
  "some_topic_name",
  (err, res) => {
    assert.ifError(err);
    assert.ok(res);
    done();
  }
);
