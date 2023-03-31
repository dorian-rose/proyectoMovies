const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, getRedirectResult } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { addNewUser } = require("./frontControllers")




const formSignUp = async (req, res) => {
    console.log('estamos en formSignUp')
    res.render('userViews/loginSignUp');

};
const signUpCreate = async (req, res) => {

    const email = req.body.email
    // const password = req.body.password
    try {
        //code de dorian: esta linea setea el email del usuario en cookies 
        res.cookie('user', email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
        //fin  code de dorian
        //const userCredential = await createUserWithEmailAndPassword(authFb, email, password)
        //console.log(userCredential)
        res.redirect(`/user/add/${email}`)// esto va a mi function de añadir a base de datos (frontController, addNewUser), y luego desde alli se redirige a dashboard
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            console.log("Email already in use", "error")
        } else if (error.code === 'auth/invalid-email') {
            console.log("Invalid email", "error")
        } else if (error.code === 'auth/weak-password') {
            console.log("Weak password", "error")
        } else if (error.code) {
            console.log("Something went wrong", "error")
        }
    }

}
const formSignIn = async (req, res) => {

    res.render('userViews/loginSignIn');

};
const signInCreate = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    try {
        const userCredentials = await signInWithEmailAndPassword(authFb, email, password)
        console.log(userCredentials)
    } catch (error) {
        if (error.code === 'auth/wrong-password') {
            console.log("Wrong password", "error")
        } else if (error.code === 'auth/user-not-found') {
            console.log("User not found", "error")
        } else {
            console.log("Something went wrong", "error")
        }
    }
}
const logOut = async (req, res) => {
    try {
        await signOut(authFb)
        console.log("signup out of ");
    } catch (error) {
        console.log(error)
    }
}
// onAuthStateChanged(auth, async (user)  => {
//     if (user) {
//         console.log(user)
//       console.log("El usuario está autenticado");
//       // realiza la lógica necesaria aquí si el usuario está autenticado
//     } else {
//       console.log("El usuario no está autenticado");
//       // realiza la lógica necesaria aquí si el usuario no está autenticado
//     }
// });


module.exports = {
    formSignUp,
    signUpCreate,
    formSignIn,
    signInCreate,
    logOut

}




// onAuthStateChanged(auth, async (user) => {
//     console.log(user)
//     if (user) {
//       loginCheck(user);
//       try {
//         const querySnapshot = await getDocs(collection(db, "posts"));
//         setupPosts(querySnapshot.docs);
//       } catch (error) {
//         console.log(error)
//       }
//     } else {
//       setupPosts([]);
//       loginCheck(user);
//     }
//   });






// //* TESTING ABSOLUTO OMG
// const loggedOutLinks = document.querySelectorAll(".logged-out");
// const loggedInLinks = document.querySelectorAll(".logged-in");

// loginCheck = (user) => {
//   if (user) {
//     loggedInLinks.forEach((link) => (link.style.display = "block"));
//     loggedOutLinks.forEach((link) => (link.style.display = "none"));
//   } else {
//     loggedInLinks.forEach((link) => (link.style.display = "none"));
//     loggedOutLinks.forEach((link) => (link.style.display = "block"));
//   }
// };