const express = require('express');
const router = express.Router();

const { getMoviesAdmin, getMovieAdmin, formCreateMovie, createMovie, deleteMovie, editMovie, formEditMovie } = require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);
router.get('/movies/title/:title', getMovieAdmin)

router.post('/movies/create-movie', createMovie);
router.get('/movies/create-form', formCreateMovie);

router.put('/movies/edit-movie/:id', editMovie);
router.get('/movies/edit-form/:id', formEditMovie);

router.get('/movies/remove-movie/:id', deleteMovie);


module.exports = router;