const express = require("express");
const router = express.Router();
const {
    searchTitle, getIndex, getMovie, searchMovie
} = require("../controllers/frontControllers");

router.get("/search/:title", searchTitle);
router.get("/", getIndex);

router.get('/search', getMovie)
router.post("/search", getMovie); 
router.get('/search', searchMovie)
router.post("/search", searchMovie); 



module.exports = router;