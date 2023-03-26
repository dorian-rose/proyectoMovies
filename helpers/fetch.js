const urlBase = 'http://www.omdbapi.com/?';
let url;
const mongoUrlBase = "http://localhost:3000/admin/movies/"
const consultation = async (title, searchTerm, user) => {  //! ver qué modificar

    try {
        let movies = "";
        console.log(title)
        if (title) {
            url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${title}`
            const response = await fetch(url);
            movies = await response.json();
            console.log(movies)
            if (movies.Response == "False") {
                console.log("in mongo api consult");
                url = `${mongoUrlBase}${title}`;
                console.log(url)
                const response = await fetch(url);
                data = await response.json();
                if (data.ok) {
                    movies = data.data
                } else { movies = data }
            }

            return movies;
        }
        if (user) {
            console.log("user", user)
            url = `http://localhost:3000/api/movie/${user}`
            const response = await fetch(url);
            movieTitles = await response.json();
        }

        return movieTitles;
    }

    catch (error) {
        console.log('FAILED retrieving fetch');
    }
};



module.exports = { consultation };



// const response = await fetch("http://localhost:3000/admin/movies/Kevin en la jungla");
// movies = await response.json();
// console.log(movies)