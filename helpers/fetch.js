const urlBase = 'http://www.omdbapi.com/?';
const url = ""

const consultation = async (title, searchTerm) => {  //! ver qué modificar
    console.log("estamos aqui en fetch")
    console.log(title)
    try {
        console.log("estamos aqui en el try")
        if (title) {

            let url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${title}`
            console.log(url)
            console.log(title)
            const response = await fetch(url);
            const movies = await response.json();

            return movies;
        }
        // if (searchTerm) {
        //     url = `${urlBase}apikey=${apikey}&s=${searchTerm}`
        // }

    }

    catch (error) {

        console.log('FAILED retrieving fetch');

    }

};



module.exports = { consultation };
