
const express = require("express");
const https = require("https");
const { url } = require("inspector");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const apiKeyEnv = process.env.API_KEY;
  console.log(apiKeyEnv);
  const city = req.body.cityName;
  const apiKey = apiKeyEnv; // INSERIR A API AQUI
  const units = "metric";
  const urlApi =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=" +
    units +
    "&appid=" +
    apiKey;
  https.get(urlApi, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDesciption = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather description</p>");
      res.write("<img src=" + iconUrl + "></img>");
      res.write(
        "<h1>The temperature in" +
          req.body.cityName +
          " is " +
          temp +
          " and the weather is " +
          weatherDesciption +
          "</h1>"
      );
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
