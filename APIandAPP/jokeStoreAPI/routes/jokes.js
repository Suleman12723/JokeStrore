const express = require("express");
const Joke = require("../models/joke");
const cors = require("../cors");

const router = express.Router();

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
  })
  .get(cors.cors, (req, res, next) => {
    const query = req.query.type ? req.query.type : null;
    if (query !== null) {
      Joke.find({ jokeType: query })
        .select("joke")
        .then(
          (jokes) => {
            let found = jokes.length > 0 ? true : false;
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ found: found, jokes: jokes });
          },
          (err) => {
            next(err);
          }
        )
        .catch((err) => {
          next(err);
        });
    } else {
      Joke.find({})
        .select("joke")
        .then(
          (jokes) => {
            let found = jokes.length > 0 ? true : false;
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ found: found, jokes: jokes });
          },
          (err) => {
            next(err);
          }
        )
        .catch((err) => {
          next(err);
        });
    }
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    if (req.body.jokeType.length > 0) {
      if (
        !req.body.jokeType.includes("office") &&
        !req.body.jokeType.includes("friends")
      ) {
        let err = new Error("Not a correct Joke Type");
        err.statusCode = 403;
        return next(err);
      }
    }
    Joke.create({
      joke: req.body.joke.toLowerCase(),
      jokeType: req.body.jokeType.length > 0 ? req.body.jokeType : ["All"],
    })
      .then(
        (joke) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ msg: "Joke added Successfully", joke });
        },
        (err) => {
          next(err);
        }
      )
      .catch((err) => {
        next(err);
      });
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 501;
    res.setHeader("Content-Type", "application/json");
    res.json({ msg: "This Action is not supported on this route" });
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 501;
    res.setHeader("Content-Type", "application/json");
    res.json({ msg: "This Action is not supported on this route" });
  });

module.exports = router;
