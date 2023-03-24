const Movies = require('../models/movieModel');


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
                movies,
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
        console.log(movie)
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


const createMovie = async (req, res) => {
        console.log('creando')
    const newMovies = new Movies(req.body);

    try {

        const movies = await newMovies.save()

        if (!movies) {

            return res.status(404).json({
                ok: false,
                msg: 'CUATROCIENTOS CUATRO NOOOOOO!'
            })

        } else {

            return res.redirect('/admin/movies')
        }


    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha podido crear la película.'
        });

    };
}

const formCreateMovie = async (req, res) => {

    res.render('../views/admin/adminCreate.ejs');

};

const editMovie = async (req, res) => {
    console.log('entrando')

    try {  
        
        const id = req.params.id;
        const title = req.body.title;
        const editedMovie = await Pelicula.findOneAndUpdate({_id:id},{$set:{title}},{new:true});
            return res.status(201).json({
                ok:true,
                msg:"actualizando pelicula",
                editedMovie,
            })
        
    } catch (error) {
        
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar película para editar'
        });

    };
  };

const formEditMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const movie = await Movies.findOne({ _id: id });

        if (!movie) {
            return res.status(404).json({
                ok: false,
                msg: 'Película no encontrada'
            });
        } else {
            res.render('../views/admin/adminEdit.ejs', {
                movie
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar película para editar'
        });
    }
};


const deleteMovie = async (req, res) => {

    try {

        const id = req.params.id;
        await Movies.findOneAndDelete({ _id: id });

        return res.redirect('/admin/movies');

    } catch (error) {
        console.log(error);
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