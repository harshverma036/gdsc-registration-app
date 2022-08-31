const express = require('express');
const randomString = require("randomstring");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv')

dotenv.config();

const app = express();

app.use(cors())

// app.get("/", (req, res) => res.send("Api is runnig"));

app.get("/gen-token", (req, res) => {
    const token = randomString.generate(50);
    res.status(200).send(token);
})
console.log(path.join(__dirname, "/client/build"))
console.log(path.join(__dirname, "client", "build", "index.html"))
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));
    console.log("working")
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  } else {
    app.get("/", (req, res) => res.send("API is running..."));
  }
  

app.listen(8700, () => console.log("Server is running.."));