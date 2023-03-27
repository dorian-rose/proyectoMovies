const express = require("express");
const router = express.Router();
const { searchTitle, getIndex, getFavouriteMovies, getMovie, searchMovie
} = require("../controllers/frontControllers");

router.get("/search-title/:title", searchTitle);
router.get("/movies", getFavouriteMovies);

router.get("/", getIndex);

//router.get('/search', getMovie)
//router.post("/search", getMovie); 
router.get('/search', searchMovie)
router.post("/search", searchMovie); 



module.exports = router;