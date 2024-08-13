const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models/student");
const port = 3000;

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//connect to mongoDB
mongoose
  .connect("mongodb://localhost:27017/studentDB", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to mongoDB.`);
  })
  .catch((e) => {
    console.error(`Failed to connected to mongoDB.` + e);
  });

// route setting
app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.get("/students/insert", (req, res) => {
  res.render("studentInsert.ejs");
});

app.post("/students/insert", (req, res) => {
  let { id, name, age, merit, other } = req.body;
  const newStudent = new Student({
    id,
    name,
    age,
    scholarship: { merit, other },
  });
  newStudent
    .save()
    .then(() => {
      console.log("Student is accepted.");
      res.render("accept.ejs", { newStudent });
    })
    .catch((e) => {
      console.error("Student is not accepted.", e);
      res.render("reject.ejs");
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/students", async (req, res) => {
  try {
    let data = await Student.find();
    res.render("students.ejs", { data });
  } catch (e) {
    console.error(`Failed to find data.`, e);
    res.send(`Failed to find data.`);
  }
});

app.get("/students/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let data = await Student.findOne({ id });
    if (!data) {
      return res.status(404).send(`Student not found`);
    }
    res.render("studentPage", { data });
  } catch (e) {
    console.error(e);
    res.status(500).send(`Error!`);
  }
});

app.get("/*", (req, res) => {
  res.status(404);
  res.send(`Not allowed.`);
});

//show current data from DB
Student.find()
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.error(e);
  });
