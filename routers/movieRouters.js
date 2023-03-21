const express = require("express");
const router = express.Router();
const {
    getTest
} = require("../controllers/movieControllers");

router.get("/test", getTest);

module.exports = router;