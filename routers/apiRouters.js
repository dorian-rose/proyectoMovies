
const express = require("express");
const router = express.Router();
const { getMovie } = require("../controllers/apiControllers");

router.get("/movies", getMovie);


module.exports = router;


