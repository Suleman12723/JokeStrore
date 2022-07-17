const express = require("express");
const createError = require("http-errors");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const apiRoute = require("./routes/jokes");

////////////////////// MONGODB CONNECTION /////////////////////////////
const url = process.env.MONGO_URL;
mongoose
  .connect(url, {
    autoIndex: true,
  })
  .then(
    () => {
      console.log("DB successfully Connected");
    },
    (err) => {
      console.log(err);
    }
  )
  .catch((err) => {
    console.log(err);
  });
////////////////////////////////////////////////////////////////////////

const app = express();

//middlerware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/joke", apiRoute);

//error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  // res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err.code === 11000) {
    res.status(403);
    res.json({ err: true, message: "Joke already exsists!" });
  } else {
    res.status(err.status || 500);
    res.json({ err: true, message: err.message });
  }
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
