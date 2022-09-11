const express = require("express");
// const upload = require("express-fileupload");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.route");
const documents = require("./routes/documents.route");

const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
// app.use(upload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/documents", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRoute);
app.use("/documents", documents);
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Database is connected.");
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
let storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },
  filename: (req, file, callback) => {
    let fileName = new Date();
    fileName = fileName.getSeconds() + file.originalname;
    callback(null, fileName);
  },
});

const upload = multer({ storage });
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    // console.log(req.body);
    return res.status(200).json("Document uploaded successfully.");
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }
});
app.listen(process.env.PORT || 3500, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
