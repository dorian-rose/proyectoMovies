const urlBase = 'http://www.omdbapi.com/?';
const url = ""

const consultation = async (title, searchTerm) => {  
    console.log("estamos aqui en fetch")
    console.log(searchTerm)
    try {
        console.log("estamos aqui en el try")
        if (title) {

            let url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${searchTerm}`
            console.log(url)
            console.log(title)
            const response = await fetch(url);
            const movies = await response.json();

            return movies;
        }
         if (searchTerm) {
            
            let url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&s=${searchTerm}`
            console.log(url)
            
            const response = await fetch(url);
            const movies = await response.json();
            console.log(searchTerm)
            

            return movies;
         }

    }

    catch (error) {

        console.log('FAILED retrieving fetch');

    }

};



module.exports = { consultation };
