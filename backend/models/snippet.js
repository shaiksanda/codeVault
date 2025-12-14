const mongoose = require("mongoose");

const snippetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);
const snippetModel=mongoose.model("Snippet", snippetSchema);


module.exports = snippetModel