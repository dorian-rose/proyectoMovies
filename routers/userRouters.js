const express = require("express");
const router = express.Router();


const { showDashboard, showSearch } = require('../controllers/userControllers')

//DASHBOARD renderView
router.get("/dashboard", showDashboard);

//SEARCH renderView
router.get("/search", showSearch)

module.exports = router;

