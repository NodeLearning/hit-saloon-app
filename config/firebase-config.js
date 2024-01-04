const admin = require("firebase-admin");

// Cloud Firestore
const { Timestamp } = require("firebase-admin/firestore");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//const auth = getAuth(app);

//initialize db
const dbFireStore = admin.firestore();

module.exports = { dbFireStore, Timestamp };
