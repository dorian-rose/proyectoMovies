const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');

const { uploadMiddleware } = require('../middleware/multer')
const { validateInputs } = require('../middleware/inputValidator');
const { checkSchema } = require('express-validator');
const createEditMovieSchema = require('../helpers/validatorMovieModel');
const { getMoviesAdmin, getMovieAdmin, formCreateMovie, createMovie, deleteMovie, editMovie, formEditMovie } = require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);
router.get('/movies/title/:title', getMovieAdmin);

router.post('/movies/create-movie', [
  uploadMiddleware.single("Poster"),
  checkSchema(createEditMovieSchema),
  validateInputs
],
  createMovie);

router.get('/movies/create-form', formCreateMovie);

router.post('/movies/edit-movie/:id', [
  uploadMiddleware.single("Poster"),
  checkSchema(createEditMovieSchema),
  validateInputs
],

  editMovie);


router.get('/movies/edit-form/:id', formEditMovie);


router.get('/movies/remove-movie/:id', deleteMovie);


module.exports = router;