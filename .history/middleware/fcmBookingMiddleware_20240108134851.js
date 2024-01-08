const {fcm , message} = require("../config/fcm_push_notification");


fcm.subscribeToTopic([message.to], "some_topic_name", (err, res) => {
  assert.ifError(err);
  assert.ok(res);
  done();
});

fcm.send(message,(err, response) => {
  if (err) {
    console.log("Something has gone wrong!");
  } else {
    console.log("Successfully sent with response: ", response);
  }
});


