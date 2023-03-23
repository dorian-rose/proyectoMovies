const express = require("express");
const router = express.Router();
const {getMovie} = require("../controllers/movieControllers");


router.get('/search', getMovie)
router.post("/search", getMovie); 

module.exports = router;