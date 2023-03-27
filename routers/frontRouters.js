const express = require("express");
const router = express.Router();
const {
    searchTitle, getIndex, getFavouriteMovies, addFavouriteMovie
} = require("../controllers/frontControllers");

router.get("/search-title/:title", searchTitle);
router.get("/movies/:user", getFavouriteMovies);
router.post("/movies/add/:movie", addFavouriteMovie);
router.get("/", getIndex);

module.exports = router;