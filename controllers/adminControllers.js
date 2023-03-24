const Movies = require('../models/movieModel');


const getMoviesAdmin = async (req, res) => {
    try {
        const movies = await Movies.find()
        res.render('admin/adminView', {
            movies,
        })

    } catch (error) {

        console.log(error)
    }
}

//
const getMovieAdmin = async (req, res) => {
    try {
        const title = req.params.title;
        console.log(title)
        const movie = await Movies.findOne({ Title: title });
        if (movie) {
            return res.status(200).json({
                ok: true,
                msg: "Movie retrieved",
                data: movie,
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "This movie doesn't exist",
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving the movie",
        });
    }
};

//

module.exports = {
    getMoviesAdmin, getMovieAdmin
}