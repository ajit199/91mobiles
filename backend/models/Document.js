const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    fileName: {
      type: String,
    },
    originalName: {
      type: String,
    },
    ext: {
      type: String,
      required: true,
    },
    size: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("document", documentSchema);
