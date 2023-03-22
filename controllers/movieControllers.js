const { consultation } = require('../helpers/fetch');

const getMovie = async (req, res) => {
  const searchQuery = req.query.search;
  
  try {
    const response = await consultation(`https://www.omdbapi.com/?apikey=cf8ab226&s=${searchQuery}`); //mirar template
    const movies = response.Search;
    
    
    console.log(movies); // Imprime los resultados en la consola
    
    res.render('movies', { movies });
  } catch (error) {
    console.error(error);
    
    return res.status(500).json({
      ok: false,
      msg: 'Error retrieving movies',
    });
  }
};

module.exports = { getMovie };
