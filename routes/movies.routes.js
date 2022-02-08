// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .then((allCelebs) => {
        res.render("movies/new-movie", {celebs: allCelebs})
    });
});

router.post("/movies/create", (req, res) => {
    console.log("BODY", req.body)
    Movie.create({
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    })
    .then((newMovie) => {
        console.log("added movies" + newMovie.title);
        res.redirect("/movies");
    })
    .catch((err) => {
        console.log("Something went wrong");
        next(error);
        res.redirect("/movies/create");
    });
});

router.get("/movies", (req, res) => {
    res.render("movies/movies");
});
  

module.exports = router;