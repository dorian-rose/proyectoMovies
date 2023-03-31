
const { consultation } = require('../helpers/fetch');
const { getReviews } = require('../helpers/scraping')


//Renderiza la vista inicial
const getIndex = (req, res) => {
    //console.log(req.oidc.isAuthenticated())
    res.render("userViews/indexx")
}

//Recoge datos de una pelicula por su titulo y pinta 
const searchTitle = async (req, res) => {
    let remove;
    let add;
    let reviews;
    // let image;
    const user = req.cookies.user
    console.log(user)
    const title = req.params.title
    const method = "GET"
    let movieData;

    try {
        const data = await consultation(`${process.env.URLBASEUSER}${user}/${title.toLowerCase()}`, method);
        if (data.data.length > 0) {
            console.log("length", data.data.length)
            remove = "display"
            add = "none"
        } else {
            remove = "none"
            add = "display"
        }

        const result = await consultation(`${process.env.URLBASEMONGO}${title}`, method)
        if (result.ok) {
            movieData = result.data
            reviews = movieData.Review
            movieData.image = `/assets/uploads/${movieData.Poster}`

        } else {
            movieData = await consultation(`${process.env.URLBASEOMDB}&t=${title}`, method)
            movieData.image = movieData.Poster
            reviews = await getReviews(title)
        }

        console.log("past reviews")
        res.render("userViews/detailView", {
            movieData,
            remove,
            add,
            reviews
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





    try {

        const { search } = req.body;
        const regex = /\s/g;
        let results;
        //  const titulo = search.replace(regex, "-")
        //  const title= req.body.title

        console.log('esto es lo que mandamos al fetch:   ', search);
        // console.log('console.l',`${process.env.URLBASEMONGO}${titulo}`)
        const moviesMongo = await consultation((`${process.env.URLBASEMONGO}${search}`))
        // const moviesMongo = await consultation((`http://localhost:3000/admin/movies/title/${titulo}`))

        console.log('Esto es lo que devuelve el mongo', moviesMongo)

        // resultados={moviesMongo};


        // if(moviesMongo == undefined){
        // Buscar película en OMDB


        if (moviesMongo.ok) {
            results = { moviesMongo };
            const image = `/assets/uploads/${results.moviesMongo.data.Poster}`
            results.moviesMongo.data.Poster = image
            console.log("este es el de mongo", results.moviesMongo.data)
            let cosa = [results.moviesMongo.data]
            res.render('userViews/searchResults', { cosa });

        }

        else {
            console.log('estamos buscando en ombdb')
            const movie = await consultation(`${process.env.URLBASEOMDB}&s=${search}`);
            results = { movie };

            console.log('ESPECTACULAR', results.movie.Search) //esto da error en consola, pero nos da igual porque pinta bien
            cosa = results.movie.Search
            console.log("esto es cosa", cosa)
            res.render('userViews/searchResults', { cosa });

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
    const user = req.cookies.user
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
                movieData.image = `/assets/uploads/${movieData.Poster}`
            } else {
                movieData = await consultation(`${process.env.URLBASEOMDB}&t=${title}`, method)
                movieData.image = movieData.Poster
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
    const user = req.cookies.user
    const title = req.params.title.toLowerCase()
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
    const user = req.cookies.user
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

const addNewUser = async (req, res) => {
    const user = req.params.user
    const body = { user }
    method = "POST"

    try {
        const response = await consultation(process.env.URLBASENEWUSER, method, body);
        if (response.ok) {
            console.log("success sending to fetch")
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error adding user before fetch",
        });
    }
    res.redirect("http://localhost:3000/dashboard")
}


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
    addNewUser

}
