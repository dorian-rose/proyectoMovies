const { consultation } = require('../helpers/fetch');

const getMovie = async (req, res) => {
  const {search} = req.body;
  console.log(search, 'estamos en getMOvie')
  
  try {
    const response = await consultation(null, search); //mirar template
    const movies = response;
    
    
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
