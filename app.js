const express = require("express");
const randomString = require("randomstring");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const Registration = require("./models/registration");
const { connectDB } = require("./db");

dotenv.config();

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
// app.get("/", (req, res) => res.send("Api is runnig"));

app.get("/gen-token", (req, res) => {
  const token = randomString.generate(50);
  res.status(200).send(token);
});

app.post("/registration", async (req, res) => {
  try {
    const nRegistration = await Registration.create(req.body);

    return res.status(201).json({
      status: "success",
      data: nRegistration,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "failed",
      msg: "Internal server error",
    });
  }
});

app.get("/getdata", async (req, res) => {
  try {
    const all = await Registration.find({}).lean();

    const allEmails = all.map((x) => x.email);

    const fdata = [];

    for (let i = 0; i < allEmails.length; i++) {
      const data = await Registration.find({
        email: allEmails[i],
      }).lean();

      console.log(data.length, "length");
      if (data.length === 4) {
        if (fdata.length) {
          const isemail = await fdata.find(x => x.email === allEmails[i]);
          if (!isemail) {
            fdata.push(data);
          }
        } else {
          fdata.push(data);

        }
      }
    }

    return res.json({
      data: fdata,
    });
  } catch (error) {
    console.log(error);
  }
});

console.log(path.join(__dirname, "/client/build"));
console.log(path.join(__dirname, "client", "build", "index.html"));
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  console.log("working");
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API is running..."));
}

app.listen(8700, () => console.log("Server is running.."));
