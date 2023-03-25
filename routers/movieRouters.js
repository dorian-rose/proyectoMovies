const express = require("express");
const router = express.Router();
const {getMovie, searchMovie} = require("../controllers/movieControllers");


router.get('/search', getMovie)
router.post("/search", getMovie); 
router.get('/search', searchMovie)
router.post("/search", searchMovie); 


module.exports = router;