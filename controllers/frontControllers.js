const { consultation } = require('../helpers/fetch');
const {connection} = require('../helpers/dbConect')
const {scrapeMovieReviews}= require('../helpers/scraping')
const mongoose = require('mongoose');

//Renderiza la vista inicial
const getIndex = (req, res) => {
   //console.log(req.oidc.isAuthenticated())
   res.render("userViews/index")
}

//Recoge datos de una pelicula por su titulo y pinta 
const searchTitle = async (req, res) => {
    try {
        const movieData = await consultation(title);
        //const reviews = await scrapeMovieReviews(search);
        //console.log(reviews)
        res.render("userViews/detailView", {
            movieData,
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
};

const searchGenre = async (req, res) => {
    try {
        const movieData = await consultation(genre);

        console.log(movieData)
        //const reviews = await scrapeMovieReviews(search);
        //console.log(reviews)
        res.render("userViews/detailView", {
            movieData,
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
    const user = req.params.user
    const arrayMovies = []
    try {
        const data = await consultation(null, null, user);
        const movieList = data.data
        //movieList.forEach(movie => {
        for (let movie of movieList) {
            const movieData = await consultation(movie.title)
            arrayMovies.push(movieData)
        }
        console.log(arrayMovies)

        res.render("userViews/favouriteMovies", { arrayMovies })

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving favourite movies",
        });
    }
}

//recoge datos y pinta lista "mis peliculas" (favourites)
const addFavouriteMovie = async (req, res) => {
    console.log("here in front controller add movie")
    const user = "4"
    movie = req.body.movie
    const title = JSON.stringify({ title: movie })
    try {
        await consultation(title, null, user);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error adding movies",
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
  searchGenre,
  showDashboard,
  showSearch,
  getMovie,
  //searchMovie,
  getFavouriteMovies,
  addFavouriteMovie,
}
