const admin = require('firebase-admin');

const serviceAccount = require('./sese-681d5-firebase-adminsdk-ns1tn-7c83882fe3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
module.exports = {
  firebaseAuth: admin.auth(),
};
