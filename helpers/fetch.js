const quitarGuiones=(frase)=>{

  //  const frase_sin=;

    return frase_sin
}

const consultation = async (url, method, body={}) => {  //! ver qué modificar
    let options = {};


    console.log({url},{method},{body})

    const data={...body}

    // if(data.title){
    //     data.title=quitarGuiones(data.title)
    // }

    try {
        console.log('estamos entrando al try del fetch')
        console.log('cosas'+`${url}`,options);
        if(method == "POST" || method == "PUT") {
            options = {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                }
            }
        }

        if(method == "DELETE") {
            options = {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                }
            }
        }
        console.log('esta es la resp del GET', `${url}`)
        let respuesta= await fetch(`${url}`, options);
        
        let resp = await respuesta.json();
        
        return resp;

    } catch (error) {
        console.log('FAILED while fetching', error)
    }
}

//         let movies = "";
//         //si tiene title y user, es funcion añadir una peli a favoritas
//         if (title && user) {

//             url = `http://localhost:3000/api/movie/add/${user}`;
//             const response = await fetch(url, {
//                 method: "POST",
//                 body: title,
//                 headers: {
//                     //'Accept': 'application/json',
//                     "Content-type": "application/json",
//                 },
//             });

//             console.log(url, {
//                 method: "POST",
//                 body: title,
//                 headers: {
//                     "Content-type": "application/json",
//                 },
//             })
//             return response;
//         }
//         //si tiene solo titulo, es funcion que busca detalles de una sola peli
//         else if (title) {
//             console.log("fetch here", title)
//             url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${title}`
//             const response = await fetch(url);
//             movies = await response.json();
            
//            console.log(movies)

//             if (movies.Response == "False") {
//                 console.log("in mongo api consult");
//                 url = `${mongoUrlBase}${title}`;
//                 const response = await fetch(url);
//                 data = await response.json();
//                 if (data.ok) {
//                     movies = data.data
//                 } else { movies = data }
//                 return movies;
//             }
//             return movies
//         }
//         //si tiene solo usuario, busca la lista de titulos de sus favoritos
//         else if (user) {
//             console.log("user", user)
//             url = `http://localhost:3000/api/movie/${user}`
//             const response = await fetch(url);

//             movieTitles = await response.json();
//             return movieTitles;
//         }

//         if (searchTerm) {
//             url = `${urlBase}apikey=${process.env.API_KEY_OMDB}&t=${searchTerm}`
//             const response = await fetch(url);
//             movies = await response.json();
//            console.log(movies)
//             if (movies.Response == "False") {
//                 console.log("in mongo api consult");
//                 url = `${mongoUrlBase}${searchTerm}`;
//                 // console.log(url)
//                 const response = await fetch(url);
//                 data = await response.json();
//                 if (data.ok) {
//                     movies = data.data
//                 } else { movies = data }
//             }

//             return movies;
//         }
//     }

//     catch (error) {
//         console.log('FAILED retrieving fetch');
//     }
// };



module.exports = { consultation };



// const response = await fetch("http://localhost:3000/admin/movies/Kevin en la jungla");
// movies = await response.json();
// console.log(movies)