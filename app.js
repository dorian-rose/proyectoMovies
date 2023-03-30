const express = require('express');
const cors = require("cors");
const cookieParser = require('cookie-parser');

//dotenv
require('dotenv').config();

const { connection } = require('./helpers/dbConect')

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use(cookieParser())

app.use(express.static('public'));


app.set('view engine', 'ejs');

app.set('views', __dirname + '/views'); //* también es posible hacer `${__dirname}/views`

// auth router attaches /login, /logout, and /callback routes to the baseURL

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

app.use("/login", require("./routers/loginRouters"));
//router for user apis (user details and list 'mis pelis')
app.use("/api", require("./routers/userApiRouters")); //en srapping está comentado


app.get("/setcookie", (req, res) => {
    console.log("hello")
    res.cookie('user', '3', { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') }) //maxAge: 5000 -expries, sameSite: 'strict' - only from same domain in which it was generated (alt - sameSite: 'lax')
    res.send('<h1>Set Cookies</h1>')
})



app.get("/clearcookie", (req, res) => {
    res.clearCookie('cookiename')
    res.send('<h1>Clear Cookies</h1>')
})

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