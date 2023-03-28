const quitarGuiones=(frase)=>{

  //  const frase_sin=;

    return frase_sin
}

const consultation = async (url, method, body={}) => {  //! ver qué modificar
    let options = {};
    // console.log('estos son los parametros de la consulta',{url},{method},{body})
    const data={...body}
    
    // if(data.title){
    //     data.title=quitarGuiones(data.title)
    // }
    try {
        console.log('estamos entrando al try del fetch')
        
        if(method == "POST" || method == "PUT"){
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
        // console.log('esta es la resp del GET', `${url}`)
        let respuesta= await fetch(`${url}`, options);
        
        let resp = await respuesta.json();
        
        return resp;

    } catch (error) {
        console.log('FAILED while fetching', error)
    }
}


module.exports = { consultation };