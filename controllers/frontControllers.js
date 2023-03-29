const { consultation } = require('../helpers/fetch');
const {getReviews}= require('../helpers/scraping')



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
        } else {
            remove = "none"
            add = "display"
        }
        // const reviews = await getReviews(search);
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

// const searchGenre = async (req, res) => {
//     try {
//         const movieData = await consultation(genre);

//         console.log(movieData)
//         //const reviews = await getReviews(search);
//         //console.log(reviews)

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

    let resultados;
    try {
      const {search}  = req.body;
      const regex = /\s/g;
      const titulo = search.replace(regex, "-")

        // console.log('console.l',`${process.env.URLBASEMONGO}${titulo}`)
        // const moviesMongo = await consultation((`${process.env.URLBASEMONGO}${titulo}`, 'get'))
        // const moviesMongo = await consultation((`http://localhost:3000/admin/movies/title/unico`, 'get'))
        // console.log('Esto es lo que devuelve el mongo', moviesMongo)
        // resultados={moviesMongo};

        // if(moviesMongo == undefined){
        // Buscar película en OMDB
        const movie = await consultation(`${process.env.URLBASEOMDB}&s=${search}`, 'get');

        if(!movie) {
            results={movie};

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
 // searchGenre,
  showDashboard,
  showSearch,
  getMovie,
  //searchMovie,
  getFavouriteMovies,
  addFavouriteMovie,
  deleteFavourite,
}
