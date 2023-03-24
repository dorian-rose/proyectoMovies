const express = require("express");
const router = express.Router();


const { showDashboard } = require('../controllers/userControllers')

//DASHBOARD renderView
router.get("/dashboard", showDashboard);

module.exports = router;

