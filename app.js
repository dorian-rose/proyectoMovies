const express = require('express');
const cors = require('cors');
require('dotenv').config();
//auth0
const { auth } = require('express-openid-connect');
//auth0 configuration
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: process.env.ISSUER,
};

const { connection } = require('./helpers/dbConect')


const app = express();

const port = process.env.PORT;


app.use(express.static('public'));


app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); //* también es posible hacer `${__dirname}/views`

// auth router attaches /login, /logout, and /callback routes to the baseURL
//app.use(auth(config));
//* CONEXION A BBDD
connection()

//* Para parsear // traducir
app.use(express.json());

//* Para parsear req con urlencoded payload
app.use(express.urlencoded({ extended: false }));

//* RUTAS

app.use('/admin', require('./routers/adminRouters')); //* Ver si la ruta llevará el /dashboard delante o no

//app.use("/api", require("./routers/apiRouters"));

app.use("/", require("./routers/frontRouters"));
app.use("/", require("./routers/userRouters"));

//router for user apis (user details and list 'mis pelis')

app.use("/api", require("./routers/userApiRouters")); //en srapping está comentado


//* En caso de error, mandar a la página 404 (Frontend y backend, hay que configurarlo)
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: 'error 404',
        parrafo: `Page not found`
    })
});

//* Listener
app.listen(port, () => {
    console.log(`connected from port ${port}`)
})