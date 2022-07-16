const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const apiRoute = require("./routes/jokes");

////////////////////// MONGODB CONNECTION /////////////////////////////
const url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(
    () => {
      console.log("DB successfully Connected");
    },
    (err) => {
      next(err);
    }
  )
  .catch((err) => {
    next(err);
  });
////////////////////////////////////////////////////////////////////////

const app = express();

//middlerware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/Joke", apiRoute);

//error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.json({ err: err.message });
  //   console.log("error" + err.message + "\n" + "Status" + err.status);
});

app.listen(3000, () => {
  console.log("The server is running on port 3000");
});
