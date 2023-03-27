const express = require("express");
const router = express.Router();
const { searchTitle, getIndex, getFavouriteMovies, getMovie, searchMovie, showDashboard, showSearch
} = require("../controllers/frontControllers");

//INDEX renderView
router.get("/", getIndex);

//DASHBOARD renderView
router.get("/dashboard", showDashboard);

//SEARCH renderView
router.get("/search", showSearch)

//Buscar pelis por título, devuelve una sola.
router.get("/search-title/:title", searchTitle);

//myMovies renderView
router.get("/myMovies", getFavouriteMovies);

router.get('/found-all', getMovie);
router.post("/found-all", getMovie);
// router.get('/found', searchMovie);
// router.post('/found', searchMovie); 



module.exports = router;