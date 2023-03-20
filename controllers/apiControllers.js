const { consultation } = require('../helpers/fetch');
const getMovie = async (req, res) => {
    console.log("estamos aqui en getmovies")
    try {
        const response = await consultation("lion king");
        // console.log("esto es el undefined", response)
        // res.render("adminViews/showServices", {
        //     titulo: "Services",
        //     texto: "View, add, update or delete services",
        //     services: services.data,
        // });
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
};

module.exports = { getMovie }