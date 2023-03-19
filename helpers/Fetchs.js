const urlBase = ''; //! Añadir la URL


const consultation = async (url, method, body={}) => {  //! ver qué modificar

    let options = {}; //! verificar que sea opciones (que serán)

    try {

        if(method == 'post' || method == 'put'){
            const data = {...body};  //! Modificar
            options = {
                method: method,
                body: JSON.stringify(data), 
                headers:{
                    'Content-Type': 'application/json'    
                }
            };
        };

        if(method == 'delete'){
            options = {
                method,
           
            }
        };

        return await fetch(`${urlBase}/${url}`, options);
        
    } catch (error) {

        console.log(error);

};

}

//module.exports = {consulta};
