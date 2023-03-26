const express = require('express');
const router = express.Router();

const { validateInputs } = require('../middleware/inputValidator');
const { checkSchema, validationResult } = require('express-validator');
const createEditMovieSchema = require('../models/validatorMovieModel');
const { getMoviesAdmin, getMovieAdmin, formCreateMovie, createMovie, deleteMovie, editMovie, formEditMovie } = require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);
router.get('/movies/title/:title', getMovieAdmin);

router.post('/movies/create-movie', checkSchema(createEditMovieSchema),validateInputs,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('create-movie-form', { errors: errors.array() });
        console.log(errors)
    } else {
      createMovie(req, res);
    }
  });
    
router.get('/movies/create-form', formCreateMovie);



router.post('/movies/edit-movie/:id', checkSchema(createEditMovieSchema),validateInputs,(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('/movies/edit-movie/:id', { errors: errors.array() });
    } else {
      editMovie(req, res);
    }
  });
    
     
router.get('/movies/edit-form/:id', formEditMovie);

router.get('/movies/remove-movie/:id', deleteMovie);


module.exports = router;