const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
require("dotenv").config();

const apiKey = process.env.API_KEY;
const audId = process.env.AUD_ID;
const apiKeyServer = process.env.API_KEY_SERVER;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({
  apiKey: apiKey,
  server: apiKeyServer,
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const secondName = req.body.lName;
  const email = req.body.email;
  const listId = audId;
  const subscribingUser = {
    firstName: firstName,
    lastName: secondName,
    email: email,
  };
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(audId, {
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNANE: subscribingUser.lastName,
        }
      }]
    });
  };
  run();
});
