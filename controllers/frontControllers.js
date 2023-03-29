const { consultation } = require('../helpers/fetch');
const { getReviews } = require('../helpers/scraping')



//Renderiza la vista inicial
const getIndex = (req, res) => {
    //console.log(req.oidc.isAuthenticated())
    res.render("userViews/index")
}

//Recoge datos de una pelicula por su titulo y pinta 
const searchTitle = async (req, res) => {
    let remove;
    let add;
    user = "3"
    const title = req.params.title

    const method = "GET"
    let movieData;
    try {
        const result = await consultation(`${process.env.URLBASEMONGO}${title}`, method)
        if (result.ok) {
            movieData = result.data

        } else {
            movieData = await consultation(`${process.env.URLBASEOMDB}&t=${title}`, method)
        }
        const data = await consultation(`${process.env.URLBASEUSER}${user}/${title}`, method);

        if (data.data.length > 0) {
            remove = "display"
            add = "none"
        } else {
            remove = "none"
            add = "display"
        }
        // const reviews = await scrapeMovieReviews(search);
        // console.log(reviews)

        res.render("userViews/detailView", {
            movieData,
            remove,
            add
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
};

//Renderiza el dashboard
const showDashboard = (req, res) => {
    try {
        res.render('userViews/dashboard')
    } catch (error) {
        console.log('FAILED to RENDER dashboard')
    }
}

//Renderiza la view del la barra de búsqueda
const showSearch = (req, res) => {
    try {
        res.render('userViews/search')
    } catch (error) {
        console.log('FAILED to RENDER search')
    }
}

//Función que busca títulos a través de la consulta, en OMDB y BBDD
const getMovie = async (req, res) => {

    console.log('entramos en función getMovie - front controller, y estamos justo ANTES del TRY')

    let results;
    try {
        const { search } = req.body;
        const regex = /\s/g;
        const titulo = search.replace(regex, "-")
        console.log('mongo url', `${process.env.URLBASEMONGO}${titulo}`)
        const moviesMongo = await consultation((`${process.env.URLBASEMONGO}${titulo}`, "GET"))
        console.log("moviesMongo", moviesMongo)

        //const result = await consultation(urlMongo, method)
        // if (result.ok) {
        //     movieData = result.data
        // } else {
        //     movieData = await consultation(url, method)
        // }
        ///     // const moviesMongo = await consultation((`http://localhost:3000/admin/movies/title/unico`, 'get'))
        // console.log('Esto es lo que devuelve el mongo', moviesMongo)
        // resultados={moviesMongo};

        // if(moviesMongo == undefined){
        // Buscar película en OMDB
        const movie = await consultation(`${process.env.URLBASEOMDB}&s=${search}`, 'get');

        if (!movie) {
            results = { movie };

            console.log(results)

            res.render('userViews/searchResults', results);

        } else {
            throw 'No movies found due to no title provided'
        }
    }

    catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error retrieving movie, please insert a valid title',
        });

    }
};

//recoge datos y pinta lista "mis peliculas" (favourites)
const getFavouriteMovies = async (req, res) => {
    const user = 3 // to be updated
    //const urlUsers = `http://localhost:3000/api/movies/${user}`
    const method = "GET"
    const arrayMovies = []
    try {
        const data = await consultation(`${process.env.URLBASEUSER}get/${user}`, method);
        const movieList = data.data

        for (let movie of movieList) {
            let movieData;
            const title = movie.title

            const result = await consultation(`${process.env.URLBASEMONGO}${title}`, method)
            if (result.ok) {
                movieData = result.data
            } else {
                movieData = await consultation(`${process.env.URLBASEOMDB}&t=${title}`, method)
            }
            arrayMovies.push(movieData)
        }

        res.render("userViews/myMovies", { arrayMovies })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving favourite movies",
        });
    }
}

//recoge datos y pinta lista "mis peliculas" (favourites)
const addFavouriteMovie = async (req, res) => {
    const user = "3"
    const title = req.params.title
    const body = { title }
    method = "POST"

    try {
        const response = await consultation(`${process.env.URLBASEUSER}add/${user}`, method, body);
        if (response.ok) {
            res.redirect("back")
        }
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error adding movies",
        });
    }
    //res.redirect(`http://localhost:3000/search-title/${req.body.title}`)   
}

const deleteFavourite = async (req, res) => {
    const user = "3"
    const title = req.params.title
    const body = { title }
    method = "DELETE"

    try {
        const response = await consultation(`${process.env.URLBASEUSER}delete/${user}`, method, body);
        if (response.ok) {
            res.redirect("back")
        } else { throw error }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error error deleting favourite",
        });
    }
}

// const searchMovie = async (req, res) => {
//     try {
//       const { search } = req.body;
//       console.log('estamos en searchMovie');
//       console.log(search, 'estamos buscando en Mongo');

//       // Conectar a la base de datos
//       await connection();

//       // Buscar películas en la base de datos
//       const movies = await Movie.find({ Title: search });

//       // Si se encontraron películas en la base de datos, mostrarlas en la vista
//       if (movies.length > 0) {
//         //return res.render('movies', { movies });
//         console.log(movies)
//       }

//       // Si no se encontraron películas en la base de datos, mostrar un mensaje de error en la vista
//       if (!movies || movies.length === 0) {
//         await getMovie()
//       }
//       // Si se encontraron películas en la base de datos, mostrarlas en la vista (aun no he pintado)
//       const moviesToRender = movies.map(async (movie) => {

//         return { movie };
//       });
//       //return res.render('myMovies', { movies: moviesToRender });

//     } catch (error) {
//       console.error(error);

//       return res.status(500).json({
//         ok: false,
//         msg: 'Error retrieving movies',
//       });
//     }
//   };

module.exports = {

    getIndex,
    searchTitle,
    showDashboard,
    showSearch,
    getMovie,
    //searchMovie,
    getFavouriteMovies,
    addFavouriteMovie,
    deleteFavourite,

}
