const { pluck, map, pick, evolve } = require("ramda");
const { google } = require("googleapis");
const express = require("express");
const app = express();
const R = require("ramda");
const renameKeys = R.curry((keysMap, obj) =>
  R.reduce(
    (acc, key) => R.assoc(keysMap[key] || key, obj[key], acc),
    {},
    R.keys(obj)
  )
);
app.get("/labels", function(req, res) {
  let token = JSON.parse(decodeURIComponent(req.param("token")));
  console.log("fetch ", token);

  if (token) {
    getLabels(token)
      .then(response => {
        res.json(response);
      })
      .catch(err => console.log(err));
  }
});
app.listen(8000);

// If modifying these scopes, delete token.json.
function getLabels(accessToken) {
  return authorize(accessToken, listLabels);
}
/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(token, callback) {
  const oAuth2Client = new google.auth.OAuth2(
    "1077561447825 - g17q2vul4bbvqpv6dkq53ina7q2puot7.apps.googleusercontent.com",
    "psQ107R41EFocxqIx64NQjTx",
    "http://localhost:8000"
  );
  oAuth2Client.setCredentials(token);

  return callback(oAuth2Client);
  // Check if we have previously stored a token.
}
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  return new Promise((resolve, reject) => {
    gmail.users.labels.list(
      {
        userId: "me"
      },
      (err, res) => {
        if (err) reject("The API returned an error: " + err);
        console.log("Labels ", res.data.labels);
        const labelIds = pluck("id", res.data.labels);
        const labelPromises = map(id => {
          console.log("Fetching : ", id);
          return new Promise((resolve, rej) => {
            gmail.users.labels.get({ id: id, userId: "me" }, (err, res) => {
              if (err) {
                console.log("Error on : ", id);
                rej(err);
                return;
              }
              const result = renameKeys(
                { messagesTotal: "count", name: "label" },
                evolve(
                  { name: toTitleCase },
                  pick(["name", "messagesTotal"], res.data)
                )
              );
              console.log("L: ", result);
              resolve(result);
            });
          });
        }, labelIds);
        console.log(labelPromises.length);
        Promise.all([...labelPromises])
          .then(res => {
            console.log(res);
            const total = res.reduce((total, label) => {
              return total + label.count;
            }, 0);
            resolve(res.filter(label => (label.count / total) * 100.0 > 5));
          })
          .catch(err => console.log("Error: " + err));
      }
    );
  });
}
