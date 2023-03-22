const express = require('express');
const router = express.Router();

const {getMoviesAdmin} = require('../controllers/adminControllers');


router.get('/movies', getMoviesAdmin);

// router.get('/movies/createMovie', );
// router.get('/movies/createForm', );

// router.put('/movies/editMovie/:id', ); 
// router.get('/movies/editForm/:id', );

// router.get('/movies/removeMovie/:id', );


module.exports = router;