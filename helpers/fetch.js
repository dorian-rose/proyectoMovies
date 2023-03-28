
const consultation = async (url, method, body = {}) => {  //! ver qué modificar
    let options = {};
    const data = { ...body }
    try {
        if (method == "POST" || method == "PUT") {
            options = {
                method: method,
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json",
                }
            }
        }
        if (method == "DELETE") {
            options = {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                }
            }
        }

        let respuesta = await fetch(url, options);
        let resp = await respuesta.json();
        return resp;
    } catch (error) {
        console.log('FAILED while fetching', error)
    }
}

module.exports = {
    consultation
}