const urlBase = 'http://www.omdbapi.com/?';
let url;
const mongoUrlBase = "http://localhost:3000/admin/movies/"
const { connection } = require('../helpers/dbConect');
const Movie = require('../models/movieModel')
const consultation = async (title, searchTerm, user) => {  //! ver qué modificar

    try {
        let movies = "";
        //si tiene title y user, es funcion añadir una peli a favoritas
        if (title && user) {
Z
            url = `http://localhost:3000/api/movie/add/${user}`;
            const response = await fetch(url, {
                method: "POST",
                body: title,
                headers: {
                    //'Accept': 'application/json',
                    "Content-type": "application/json",
                },
            });

            console.log(url, {
                method: "POST",
                body: title,
                headers: {
                    "Content-type": "application/json",
                },
            })
            return response;
        }
        //si tiene solo titulo, es funcion que busca detalles de una sola peli
        else if (title) {
            console.log("fetch here", title)
            url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${title}`
            const response = await fetch(url);
            movies = await response.json();
            
           console.log(movies)

            if (movies.Response == "False") {
                console.log("in mongo api consult");
                url = `${mongoUrlBase}${title}`;
                const response = await fetch(url);
                data = await response.json();
                if (data.ok) {
                    movies = data.data
                } else { movies = data }
                return movies;
            }
            return movies
        }
        //si tiene solo usuario, busca la lista de titulos de sus favoritos
        else if (user) {
            console.log("user", user)
            url = `http://localhost:3000/api/movie/${user}`
            const response = await fetch(url);
   //// estaba en la rama de Dorian
        
  //// estaba en la rama de Dorian
            movieTitles = await response.json();
            return movieTitles;
        }

       
        console.log(searchTerm)
        if (searchTerm) {
            url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&s=${searchTerm}`;
            const response = await fetch(url);
            movies = await response.json();
            console.log(movies);
      
            if (movies.Response == "False") {
              console.log("in mongo api consult");
              const movieFromMongo = await searchInMongo(searchTerm);
              if (movieFromMongo) {
                foundInMongo = true;
                movies = movieFromMongo;
              }
            }
      
            if (!foundInMongo) {
              return movies;
            }
          }
    }

    catch (error) {
        console.log('FAILED retrieving fetch');
    }
};








const searchInMongo = async (title) => {
  try {
    await connection();
     await Movie.findOne({ Title: { $regex: `^${title}$`, $options: 'i' } });
    console.log(movie);
    if (movie) {
      return {
        Title: movie.Title,
        Year: movie.Year,
        Rated: movie.Rated,
        Released: movie.Released,
      };
    } else {
      return null;
    }
  } catch (error) {
    console.log('Failed searching movie in MongoDB');
    return null;
  }
};

module.exports = { consultation };





















