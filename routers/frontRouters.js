const express = require("express");
const router = express.Router();


const { searchTitle, getIndex, getFavouriteMovies, getMovie, showDashboard, showSearch, addFavouriteMovie, deleteFavourite, searchGenre, addNewUser } = require("../controllers/frontControllers");

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

//myMovies renderView
//router.get("/myMovies", getFavouriteMovies); //change to remove capital 

//FAVOURITES renderView
router.get("/movies", getFavouriteMovies);

//FAVOURITES envía el formulario
router.get("/movies/add/:title", addFavouriteMovie);

//DELETES FROM favourites
router.get("/movies/delete/:title", deleteFavourite);

//ADD user to SQL
router.get("/user/add/:user", addNewUser);

//router.get('/found-all', getMovie);
// router.get('/found', searchMovie);
// router.post('/found', searchMovie); 

module.exports = router;