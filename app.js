const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
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
  })
  .catch((e) => {});

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.post("/students/insert", (req, res) => {});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
