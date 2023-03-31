const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,  } = require('firebase/auth');
const { authFb } = require('../helpers/firebase')
const { addNewUser } = require("./frontControllers")




const formSignUp = async (req, res) => {
    console.log('estamos en formSignUp')
    res.render('userViews/loginSignUp');

};
const signUpCreate = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    try {

        const userCredential = await createUserWithEmailAndPassword(authFb, email, password)
       //esta linea setea el email del usuario en cookies 
        res.cookie('user', email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })
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

    const { email, password } = req.body
    console.log(email, password)
    //const password = req.body.password
    try {
        const userCredentials = await signInWithEmailAndPassword(authFb, email, password)
        //esta linea setea el email del usuario en cookies 
        res.cookie('user', email, { http: true, secure: true, sameSite: 'strict', expires: new Date('2023-12-20') })    
        //console.log(userCredentials)
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



const forgotPassword = async (req, res) => {
    res.render('userViews/forgotPassword');
  }
  
  const requestPasswordReset = async (req, res) => {
    const email = req.body.email;
    try {
      await sendPasswordResetEmail(authFb, email);
      console.log("Password reset email sent successfully");
      res.render("userViews/loginSignIn", { message: "Password reset email sent successfully" });
    } catch (error) {
      console.log("Error sending password reset email", error);
      res.render("userViews/loginSignIn", { message: "Error sending password reset email" });
    }
  };


  const resetPassword = async (req, res) => {
    const { oobCode, newPassword } = req.body;
    try {
      await confirmPasswordReset(authFb, oobCode, newPassword);
      console.log("Password reset successful");
      res.render("userViews/loginSignIn", { message: "Password reset successful" });
    } catch (error) {
      console.log("Error resetting password", error);
      res.render("userViews/loginSignIn", { message: "Error resetting password" });
    }
  };

  const resetLinkSent = async (req, res) => {
    res.render('userViews/resetLinkSent');
  }




  




module.exports = {
    formSignUp,
    signUpCreate,
    formSignIn,
    signInCreate,
    logOut

}











