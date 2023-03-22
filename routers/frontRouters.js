const express = require("express");
const router = express.Router();
const {
    searchTitle
} = require("../controllers/frontControllers");

router.get("/search/:title", searchTitle);

module.exports = router;