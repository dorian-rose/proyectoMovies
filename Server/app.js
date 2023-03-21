const express = require('express');
const cors = require('cors');

const {connection}=require('./helpers/dbConect')


require('dotenv').config();

const app = express();

const port = process.env.PORT;


app.use(express.static('public'));


app.set('view engine', 'ejs');

app.set('views', __dirname + './client/views'); //* también es posible hacer `${__dirname}/views`

//* CONEXION A BBDD
connection()

//* Para parsear // traducir
app.use(express.json());

//* Para parsear req con urlencoded payload
app.use(express.urlencoded({ extended: false }));

//* RUTAS

app.use("/", require('./routers/movieRouters'));
//app.use('/dashboard',require('./routers/adminRouters'));

//app.use('/dashboard/createMovie', require('./routers/adminRouters')); //* Ver si la ruta llevará el /dashboard delante o no

app.use("/api", require("./routers/apiRouters"));


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