const Movies = require('../models/movieModel');
// const multer = require('multer');
// const path = require('path');

const getMoviesAdmin = async (req, res) => {

    try {

        const movies = await Movies.find()

        if (!movies) {

            return res.status(404).json({
                ok: false,
                msg: 'CUATROCIENTOS CUATRO NOOOOOO!'
            })

        } else {


            return res.render('admin/adminView', {
                movies
            })

        }


    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving the movie",
        });

    }
}

const getMovieAdmin = async (req, res) => {

    try {
        const title = req.params.title;
        const movie = await Movies.findOne({ Title: title });
        if (movie) {
            return res.status(200).json({
                ok: true,
                msg: "Movie retrieved",
                data: movie,
            });
        }
        else { throw error }
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error retrieving the movie",
        });

    }
};


const createMovie = async (req, res) => {
    console.log(req)
    const newMovies = new Movies({

        Title: req.body.Title,
        Year: req.body.Year,
        Genre: req.body.Genre,
        Director: req.body.Director,
        Poster: req.file.filename,
        Runtime: req.body.Runtime,
        Actors: req.body.Actors,
        Plot: req.body.Plot,
        Metascore: req.body.Metascore,
        Review: req.body.Review,


    });

    try {
        if (!res.errors) {
            console.log("here")
            await newMovies.save();
            return res.redirect('/admin/movies');

        } else {

            const errors = res.errors;
            res.render('../views/admin/adminCreate.ejs', { errors });

        }

    } catch (error) {


        return res.status(500).json({
            ok: false,
            msg: "Error creating the movie",
        });

    }
};


const formCreateMovie = async (req, res) => {

    res.render('../views/admin/adminCreate.ejs');


};

const editMovie = async (req, res) => {


    try {

        const id = req.params.id;
        const title = req.body.Title;
        const year = req.body.Year;
        const genre = req.body.Genre;
        const director = req.body.Director;
        const poster = req.file.filename;
        const runtime = req.body.Runtime;
        const actors = req.body.Actors;
        const plot = req.body.Plot;
        const metascore = req.body.Metascore;
        const review = req.body.Review;

        const update = { 'Title': title, 'Year': year, 'Genre': genre, 'Director': director, 'Poster': poster, 'Runtime': runtime, 'Actors': actors, 'Plot': plot, 'Metascore': metascore, 'Review': review };


        if (!res.errors) {

            await Movies.findOneAndUpdate({ _id: id }, { $set: update });
            return res.redirect('/admin/movies');

        } else {

            const movie = await Movies.findById(req.params.id);
            const errors = res.errors;
            res.render('../views/admin/adminEdit.ejs', { movie, errors });
        }

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error retrieving the movie",
        });

    };
};

const formEditMovie = async (req, res) => {

    const id = req.params.id;
    const movie = await Movies.findOne({ _id: id });
    res.render('../views/admin/adminEdit.ejs', {
        movie,
    });

};


const deleteMovie = async (req, res) => {

    try {

        const id = req.params.id;
        await Movies.findOneAndDelete({ _id: id });

        return res.redirect('/admin/movies');

    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha podido eliminar la película.'
        });
    }

};

module.exports = {

    getMovieAdmin,
    getMoviesAdmin,
    createMovie,
    formCreateMovie,
    editMovie,
    formEditMovie,
    deleteMovie,
}