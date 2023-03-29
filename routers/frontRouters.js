const express = require("express");
const router = express.Router();

const { searchTitle, getIndex, getFavouriteMovies, getMovie, searchMovie, showDashboard, showSearch, addFavouriteMovie, searchGenre
} = require("../controllers/frontControllers");

//INDEX renderView
router.get("/", getIndex);

//DASHBOARD renderView
router.get("/dashboard", showDashboard);

//SEARCH renderView
router.get("/search", showSearch)

//Envía lo que recoge el formulario
router.post("/found-all", getMovie);

//Buscar pelis por título, devuelve una sola.
router.get("/search-title/:title", searchTitle);

//Search by genre movie - sends form
router.post("/search-genre/:genre", searchGenre);

//myMovies renderView
router.get("/my-movies", getFavouriteMovies);

//FAVOURITES renderView
router.get("/movies/:user", getFavouriteMovies);

//FAVOURITES envía el formulario
router.post("/movies/add/:movie", addFavouriteMovie);

//DELETES FROM favourites
// router.get("/movies/delete/:title", deleteFavourite);

//router.get('/found-all', getMovie);
// router.get('/found', searchMovie);
// router.post('/found', searchMovie); 

module.exports = router;