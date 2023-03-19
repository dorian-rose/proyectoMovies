# proyectoMovies

Frontend (usuario):

1. Vista inicial (ruta: /) -index. Tiene ejs (pug) o html con la vista inicial. Esta tiene botones para registrarse (usuario) o login (admin o usuario). Tambien tiene boton para recuperar contraseña. 

2. proceso de registrarse (ruta: /signup, method: POST). No tiene ejs/pug/html, pero redirige a la pagina pos-login (dashboard?) cuanda se haya registrado con exito el usuario, o de vuelta al formulario con un mensaje de error si hubiera error al registrarse.

3.  proceso de login (ruta: /login, method: POST). No tiene ejs/pug/html, pero redirige a la pagina pos-login (dashboard?) cuanda se haya logueado con exito el usuario, o de vuelta al formulario con un mensaje de error si hubiera error al hacer login. 

4. recuperar contraseña: /recoverpassword /restorepassword (ver notas)

5. menu "hamburguesa" para importar ("include") en toda pagina menos dashboard - tiene botones que redirigen a salir, busqueda, mis pelis 

6. Panel de control/dashboard (ruta: /dashboard, mehtod: GET) - tiene ejs/pug/html con boton "buscar" y "mis pelis" (no se enseña menu aqui pero tiene boton de salir/back)

7. busqueda (ruta: /search, mthod: GET) Aparecerá un buscador (una caja de texto y un botón o icono de enviar) que buscará una película por título y mostrará a continuación las posibles coincidencias. Lo complicado aqui va a ser que tiene que primero buscar en el api que elijamos (IMBD?) y si no encuentra nada alli, tiene que buscar en la base de datos que creamos en Mongo. 
Para cada posible coincidencia encontrado, dara la opcion de añadir a favoritos. 
Para cada posible coincidencia encontrado, dara la opcion de ver Vista detalle de la película??

8. ruta:/search/:title, method: GET - vista detalle de la pelicula. 
Tiene botón de Añadir a Mis películas, que tiene que vincular la peli con el Usuario - no se cree ddbb nuevo pero asocia la fuente de la peli con el usuario. Cada usuario differente tendra su lista de pelis asociadas. 
8b- en la vista detalle tiene que aparecer resenas de la peli, que se obtendran via scraping
