const admin = require('firebase-admin');
const serviceAccount = require('./grab-a-guard-firebase-adminsdk.json');//TODO: Add your own private key file here IN FIREBASE ACCOUNT --SELECT PROJECT--->SETTINGS--->SERVICE ACCOUNTS--->GENERATE NEW PRIVATE KEY

const initializeFirebaseAdmin = () => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

module.exports = initializeFirebaseAdmin;
