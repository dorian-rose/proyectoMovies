const express = require("express");
const router = express.Router();
const {
    searchTitle, getIndex
} = require("../controllers/frontControllers");

router.get("/search/:title", searchTitle);
router.get("/", getIndex);

module.exports = router;