const express = require("express");
const router = express.Router();
const {getMovie
    
} = require("../controllers/movieControllers");

router.get("/movies", getMovie);

module.exports = router;