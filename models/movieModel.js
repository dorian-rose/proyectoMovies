const { Schema, model } = require('mongoose');

const MoviesSchema = new Schema({

    Title: {
        type: String,
        required: true,
        trim: true
    },

    Year: {
        type: String,
        required: true,
        trim: true
    },

    Runtime: {
        type: String,
        required: true,
        trim: true
    },

    Genre: {
        type: String,
        required: true,
        trim: true
    },

    Director: {
        type: String,
        required: true,
        trim: true
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

    Review: {
        type: String,
    },

    fecha: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Movies', MoviesSchema)
