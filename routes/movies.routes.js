// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//Create New Movie
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

//Display all movies
router.get("/movies", (req, res) => {
    Movie.find()
    .then((allMovies) => {
        console.log(allMovies);
        res.render("movies/movies", {movies: allMovies});
    })
    .catch((err) => {
        console.log(err);
    });
});
  
//Display Movie Details
router.get("/movies/:movieId", (req, res) => {
    Movie.findById(req.params.movieId)
    .populate("cast")
    .then((foundMovie) => {
        res.render("movies/movie-details", {foundMovie});
    })
    .catch((err) => {
        console.log("Something went wrong");
    });
});

//Delete Movies

router.post("/movies/:movieId/delete", (req, res)=>{
  Movie.findByIdAndRemove(req.params.movieId)
  .then(()=>{
    console.log("movie deleted")
    res.redirect("/movies");
  })
  .catch(err=>{
    console.log("Something went wrong:", err)
  })
})

//Edit Movies

router.get("/movies/:movieId/edit", (req, res) => {
    Movie.findById(req.params.movieId).then((results) => {
        Celebrity.find().then((celebrities) => {
           res.render("movies/edit-movie", {celebrities, results});
        });
    });
});

router.post("/movies/:movieId/edit", (req, res) => {
    Movie.findByIdAndUpdate(req.params.movieId, {
       title: req.body.title,
       genre: req.body.genre,
       plot: req.body.plot,
       cast: req.body.cast,
    }).then((updateMovie) => {
        console.log("Movie has been updated");
        res.redirect(`/movies/${updateMovie.id}`);
    });
});

module.exports = router;