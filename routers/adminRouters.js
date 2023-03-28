const express = require('express');
const router = express.Router();

const { validateInputs } = require('../middleware/inputValidator');
const { checkSchema } = require('express-validator');
const createEditMovieSchema = require('../models/validatorMovieModel');
const { getMoviesAdmin, getMovieAdmin, formCreateMovie, createMovie, deleteMovie, editMovie, formEditMovie } = require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);
router.get('/movies/title/:title', getMovieAdmin);

router.post('/movies/create-movie', [
  checkSchema(createEditMovieSchema),
  validateInputs
],
  (req, res) => {
    createMovie(req, res);
  });

router.get('/movies/create-form', formCreateMovie);

router.post('/movies/edit-movie/:id', [
  checkSchema(createEditMovieSchema),
  validateInputs
],
  (req, res) => {
    editMovie(req, res);
  });

router.get('/movies/edit-form/:id', formEditMovie);


router.get('/movies/remove-movie/:id', deleteMovie);


module.exports = router;