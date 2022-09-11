const uploadRoute = require("express").Router();
let uploadFolderPath = require("path").resolve(__dirname, "../uploads");
let Document = require("../models/Document");
const fs = require("fs");

// upload a document
uploadRoute.post("/", async (req, res) => {
  try {
    let document = await Document.create(req.body);
    res.status(200).json(document);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get documents of a user

uploadRoute.get("/", async (req, res) => {
  let { userId } = req.query;
  try {
    let documents = await Document.find({ userId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a document

uploadRoute.delete("/delete/:documentName", async (req, res) => {
  try {
    await Document.deleteOne({ fileName: req.params.documentName });
    fs.unlink(`${uploadFolderPath}/${req.params.documentName}`, (err) => {
      if (err) {
        throw err;
      }
      res.status(200).send("File is deleted.");
    });
  } catch (error) {
    res.status(500).json({ Error: "Internal Server Error." });
  }
});

module.exports = uploadRoute;
