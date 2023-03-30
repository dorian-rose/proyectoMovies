
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, loginCheck, onAuthStateChanged } = require('firebase/auth');
const { auth } = require('../helpers/firebase')



const formSignUp = async (req, res) => {

  res.render('../views/userViews/loginSignUp.ejs');

};

const signUpCreate = async (req, res) => {

  console.log(auth)
  const email = "dorian@finishproject.com" //req.body.email
  const password = "1234abcd" //req.body.password

  try {

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    console.log(userCredential)


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

  res.render('../views/userViews/loginSignIn.ejs');


};

const signInCreate = async (req, res) => {

  console.log(auth)
  const email = "dorian@finishproject.com" //req.body.email
  const password = "1234abcd" //req.body.password


  try {

    const userCredentials = await signInWithEmailAndPassword(auth, email, password)
    console.log(userCredentials)
    auth.currentUser = "dorian"

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

const formLogOut = async (req, res) => {

  res.render('../views/userViews/logOut.ejs');

};

const logOut = async (req, res) => {

  try {
    await signOut(auth)
    console.log("signup out");
  } catch (error) {
    console.log(error)
  }
}




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