const { consultation } = require('../helpers/fetch');
const {scrapeMovieReviews}= require('../helpers/scraping')
//Renderiza la vista inicial
const getIndex = (req, res) => {
   //console.log(req.oidc.isAuthenticated())
   res.render("userViews/index")
}

//Recoge datos de una pelicula por su titulo y pinta 
const searchTitle = async (req, res) => {
    const title = req.params.title
    try {
        const movieData = await consultation(title);
        const reviews = await scrapeMovieReviews(search);
        //console.log(movieData)
        console.log(reviews)
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

/////////
const searchMovie = async (req, res) => {
    try {
      const { search } = req.body;
      console.log('estamos en searchMovie');
      console.log(search, 'estamos buscando en Mongo');
  
      // Conectar a la base de datos
      await connection();
  
      // Buscar películas en la base de datos
      const movies = await Movie.find({ Title: search });
  
      // Si se encontraron películas en la base de datos, mostrarlas en la vista
      if (movies.length > 0) {
        return res.render('movies', { movies });
      }
  
      // Si no se encontraron películas en la base de datos, mostrar un mensaje de error en la vista
      if (!movies || movies.length === 0) {
        await getMovie()
      
        
      }
  
      // Si se encontraron películas en la base de datos, mostrarlas en la vista (aun no he pintado)
      const moviesToRender = movies.map(async (movie) => {
       
        return { movie };
      });
  
      return res.render('movies', { movies: moviesToRender });
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        ok: false,
        msg: 'Error retrieving movies',
      });
    }
  };
  
  const getMovie = async (req, res) => {
    try {
      const { search } = req.body;
      console.log(search, 'estamos en getMovie');
  
      // Buscar película en OMDB
      const movie = await consultation(null, search);
  
      // Si no se encontró la película en OMDB, mostrar un mensaje de error en la vista
      if (!movie) {
        return res.render('movies', { error: 'Movie not found' });
      }
  
      console.log('este es el titulo:', search)
      // Si se encontró la película en OMDB, obtener las reseñas y mostrarlas en la vista
     
     
      
  
      //return res.render('movie', { movie});  //no tengo la ruta para renderizar, lo saco por consola
     
     
     console.log(movie)
    
    
      console.log('review', reviews)
    
    
    } catch (error) {
      console.error(error);
  
      return res.status(500).json({
        ok: false,
        msg: 'Error retrieving movie',
      });
    }
  };





module.exports = { searchTitle, getIndex, searchMovie, getMovie }