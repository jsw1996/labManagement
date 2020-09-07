var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "YOUR_PROJECT_LINK"
});

const firestore = admin.firestore();
// const path = require("path");
// const fs = require("fs");
// const directoryPath = path.join(__dirname, "files");

var file = "slackProfile.json"
var menu = require("./files/" + file);

menu.forEach(function (obj) {
  firestore
    .collection("test3")
    .doc()
    .set(obj)
    .then(function (docRef) {
      console.log("Document written");
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
});
