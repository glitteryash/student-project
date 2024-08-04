const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to mongoDB.`);
  });

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
