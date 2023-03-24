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
        console.log(title, 'estamos en controller')
        const url = `movies/${title}`;
        const method = 'post';

        // await Movies.find(url, method, title);


        res.render('../views/admin/movies',{
            titulo: title
        });

    } catch (error) {

        console.log(error)

        return res.status(500).json({
            ok: false,
            msg: 'ERROR: no se ha podido editar la película.'
        });

    }
};

const formEditMovie = async (req,res) => {

    let id = req.params;
    console.log(id, 'estamos aqui')
    // const url = `movies/${id}`;
    // const method = 'get';

    // await Movies(url);


    res.render('../views/admin/edit-movie', {
        id,
    });

}


const deleteMovie = async (req, res) => {

    const id = req.params.id;

    const url = `movies/${id}`;
    const method = 'delete';


    await consulta(url, method, req.body);


    res.redirect('/admin/movies');

};
module.exports = {

    getMoviesAdmin,
    createMovie,
    formCreateMovie,
    editMovie,
    formEditMovie,
    //deleteMovie

}