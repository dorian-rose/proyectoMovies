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

    Actors: {

        type: String,

    },

    Plot: {

        type: String,

    },

    Poster: {

        type: String,
        required: true,

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