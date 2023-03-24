const { Schema, model } = require('mongoose');

const MoviesSchema = new Schema({

    Title: {
        type: String,
        required: true,
    },

    Year: {

        type: String,
        required: true,

    },

    Runtime: {

        type: String,
        required: true,

    },

    Genre: {

        type: String,
        required: true,

    },

    Director: {

        type: String,
        required: true,

    },

    Poster: {

        type: String,
        required: true,

    },

    Actors: {

        type: String,

    },

    Plot: {

        type: String,

    },

    Metascore: {

        type: String,


    },

    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Movies', MoviesSchema)


// const createEditMovieSchema = {
//     Title: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'El título es requerido'
//     },
//     Year: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'El año es requerido'
//     },
//     Runtime: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'La duración es requerida'
//     },
//     Genre: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'El género es requerido'
//     },
//     Director: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'El director es requerido'
//     },
//     Poster: {
//         in: ['body'],
//         isString: true,
//         notEmpty: true,
//         errorMessage: 'La imagen es requerida'
//     },
// };

//router.post('/movies/create-movie',checkSchema(createMovieSchema), validarInputs, createMovie);