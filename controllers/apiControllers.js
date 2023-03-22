const { consultation } = require('../helpers/fetch');
const getMovie = async (req, res) => {
    console.log("estamos aqui en getmovies")
    try {
        const response = await consultation("lion king");
    } catch (error) {

        return res.status(500).json({
            ok: false,
            msg: "Error retrieving movies",
        });
    }
};
