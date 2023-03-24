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

        console.log(error)

    }

}


const createMovie = async (req, res) => {

    const newMovies = new Movies(req.body);

    try {

        const movies = await newMovies.save()

        if (!movies) {

            return res.status(404).json({
                ok: false,
                msg: 'CUATROCIENTOS CUATRO NOOOOOO!'
            })

        } else {

            return res.status(201).json({
                ok: true,
                msg: 'Película creada',
                data: movies
            })
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
    try {
        const title = req.params.title;
        const movie = await Movies.findOne({ Title: title });

        if (!movie) {
            return res.status(404).json({
                ok: false,
                msg: 'Película no encontrada'
            });
        } else {
            movie.Title = req.body.Title;

            const updatedMovie = await movie.save();

            res.redirect('/admin/movies');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar película para editar'
        });
    }
};


const formEditMovie = async (req, res) => {
    try {
        const title = req.params.title;
        const movie = await Movies.findOne({title: title});

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

      const title = req.params.title;
      const movie = await Movies.findOneAndDelete({ title });

      if (!movie) {
        return res.status(404).json({
          ok: false,
          msg: 'Película no encontrada'
        });
      }
      res.redirect('/admin/movies');
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        msg: 'ERROR: no se ha podido eliminar la película.'
      });
    }
  };


module.exports = {

    getMoviesAdmin,
    createMovie,
    formCreateMovie,
    editMovie,
    formEditMovie,
    deleteMovie

}