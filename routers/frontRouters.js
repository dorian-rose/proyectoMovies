const express = require("express");
const router = express.Router();
const {
    searchTitle, getIndex, getFavouriteMovies
} = require("../controllers/frontControllers");

router.get("/search/:title", searchTitle);
router.get("/movies", getFavouriteMovies);
router.get("/", getIndex);

module.exports = router;