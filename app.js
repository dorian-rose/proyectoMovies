const express= require('express');

//const cors = require('cors');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;


app.use(express.static('public'));


app.set('view engine', 'ejs');

app.set('views',__dirname + 'views'); //* también es posible hacer `${__dirname}/views`

//* Para parsear // traducir
app.use(express.json());

//* traducir para POSTMAN
app.use(express.urlencoded({ extended: false }));

//* RUTAS


//app.use('/dashboard',require('./routers/adminRouters'));

//app.use('/dashboard/createMovie', require('./routers/adminRouters')); //* Ver si la ruta llevará el /dashboard delante o no




//* En caso de error, mandar a la página 404 (Frontend y backend, hay que configurarlo)
app.use((req,res,next)=>{
    res.status(404).render("404",{
        titulo:'error 404',
        parrafo: `Page not found`
    }) 
 });

//* Listener
app.listen(port, () => {
    console.log(`conectados al servidor por el puerto ${port}`)
})