const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const res = require("express/lib/response");
const app = express();
require("dotenv").config();

const apiKey = process.env.API_KEY; // api key
const audId = process.env.AUD_ID; // audience id
const apiKeyServer = process.env.API_KEY_SERVER; // server, like us-1, us-2 etc

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running at port 3000");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/failure.html", (req, res) => {
  res.redirect("/");
});

mailchimp.setConfig({
  apiKey: apiKey,
  server: apiKeyServer,
});

app.post("/", function (req, res) {
  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(audId, {
      members: [
        {
          email_address: req.body.email,
          status: "subscribed",
          merge_fields: {
            FNAME: req.body.fName,
            LNAME: req.body.lName
          },
        },
      ],
    });
    if (response.errors[0] === undefined){
      res.sendFile(__dirname + "/sucess.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
  };

  run();
});
