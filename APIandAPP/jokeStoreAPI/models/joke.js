const mongoose = require("mongoose");

const jokeSchema = new mongoose.Schema(
  {
    joke: {
      type: String,
      minlength: 1,
      unique: true,
      required: true,
    },
    jokeType: [
      {
        type: String,
        minlength: 3,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Joke", jokeSchema);
