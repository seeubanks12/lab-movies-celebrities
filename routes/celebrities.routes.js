// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
    console.log("BODY", req.body)
    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    })
    .then((newCeleb) => {
        console.log(`A new celebrity names ${newCeleb.name} was created`);
        res.redirect("/celebrities");
    })
    .catch((err) => {
        console.log("Something went wrong");
        next(error);
        res.redirect("/celebrities/create");
    });
});

router.get("/celebrities", (req, res) => {
    console.log("Celebrities")
  Celebrity.find()
    .then((allCelebs) => {
      console.log("All Celebs", allCelebs);
      res.render("celebrities/celebrities", { celebs: allCelebs });
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});
module.exports = router;