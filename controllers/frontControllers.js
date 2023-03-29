const { consultation } = require('../helpers/fetch');
//const { connection } = require('../helpers/dbConect')
const { scrapeMovieReviews } = require('../helpers/scraping')

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
    console.log(title)
    const urlMongo = `http://localhost:3000/admin/movies/title/${title}`
    const url = `http://www.omdbapi.com/?apikey=cf8ab226&t=${title}`
    const urlUsers = `http://localhost:3000/api/movie/${user}/${title}`
    const method = "GET"
    let movieData;
    try {
        const result = await consultation(urlMongo, method)
        if (result.ok) {
            movieData = result.data
        } else {
            movieData = await consultation(url, method)
        }
        const data = await consultation(urlUsers, method);
        if (data.data.length > 0) {
            remove = "display"
            add = "none"
            console.log("remove")
        } else {
            console.log(data.data)
            console.log("add")
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


const getMovie = async (req, res) => {
    try {
        const { search } = req.body;
        console.log(search, 'estamos en getMovie');
        // Buscar película en OMDB
        const movie = await consultation(null, search, null);
        if (!movie) {
            //return res.render('movies', { error: 'Movie not found' });
        }
        console.log('este es el titulo:', search)
        //console.log(movie)
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error retrieving movie',
        });
    }
};

//recoge datos y pinta lista "mis peliculas" (favourites)
const getFavouriteMovies = async (req, res) => {
    const user = 3 // to be updated
    const urlUsers = `http://localhost:3000/api/movies/${user}`
    const method = "GET"
    const arrayMovies = []
    try {
        const data = await consultation(urlUsers, method);
        const movieList = data.data
        for (let movie of movieList) {
            let movieData;
            const title = movie.title
            const urlMongo = `http://localhost:3000/admin/movies/title/${title}`
            const url = `http://www.omdbapi.com/?apikey=cf8ab226&t=${title}`
            const result = await consultation(urlMongo, method)
            if (result.ok) {
                movieData = result.data
            } else {
                movieData = await consultation(url, method)
            }
            arrayMovies.push(movieData)
        }
        // res.render("userViews/favouriteMovies", { arrayMovies })
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
    const urlUsers = `http://localhost:3000/api/movie/add/${user}`

    try {
        const response = await consultation(urlUsers, method, body);
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
    const urlUsers = `http://localhost:3000/api/movie/delete/${user}`

    try {
        const response = await consultation(urlUsers, method, body);
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

module.exports = {
    searchTitle,
    getIndex,
    getFavouriteMovies,
    //searchMovie,
    getMovie,
    showDashboard,
    showSearch,
    addFavouriteMovie,
    deleteFavourite
}
