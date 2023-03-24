const express = require('express');
const router = express.Router();
const { validarInputs } = require('../middleware/inputValidator');
const { check } = require('express-validator');
const {getMoviesAdmin, getMovieAdmin, formCreateMovie, createMovie, deleteMovie, editMovie, formEditMovie} =require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);
router.get('/movies/title/:title', getMovieAdmin);

router.post('/movies/create-movie',[
    check('Title','Falta el titulo de la pelicula').not().isEmpty(),  //* IMPORTANTE HACER BIEN LA VALIDACIÓN LUEGO, VALORAR HACER SCHEMA VALIDATION QUE ESTA COMENTADO EN MODEL
    check('Year','Falta el año').not().isEmpty(),
    check('Runtime','Falta la duración').not().isEmpty(),
    check('Genre','Falta el género').not().isEmpty(),
    check('Director','Falta el nombre del director').not().isEmpty(),
    check('Poster','Falta la imagen de la película').not().isEmpty(),
    validarInputs], createMovie);
    
router.get('/movies/create-form', formCreateMovie);



router.post('/movies/edit-movie/:id',[
    check('Title','Falta el titulo de la pelicula').not().isEmpty(),
    check('Year','Falta el año').not().isEmpty(),
    check('Runtime','Falta la duración').not().isEmpty(),
    check('Genre','Falta el género').not().isEmpty(),
    check('Director','Falta el nombre del director').not().isEmpty(),
    check('Poster','Falta la imagen de la película').not().isEmpty(),
    validarInputs],  
    editMovie);// * METER LUEGO DENTRO[ //* IMPORTANTE HACER BIEN LA VALIDACIÓN LUEGO
    
     
    
router.get('/movies/edit-form/:id', formEditMovie);

router.get('/movies/remove-movie/:id', deleteMovie);


module.exports = router;