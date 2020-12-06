import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDh_Xkab6hKgxeEAnn2vowFgdoX9YeDt0s",
    authDomain: "fly-line-66271.firebaseapp.com",
    projectId: "fly-line-66271",
    storageBucket: "fly-line-66271.appspot.com",
    messagingSenderId: "537260604396",
    appId: "1:537260604396:web:83e91b99998cccbbae9ec9",
    measurementId: "G-TSTY9EE3ZW"
  };

//   Initialize firebase authentication
  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  export const signInWithGoogle = () => {
      auth.signInWithPopup(provider)
      .then((result) => {
          return console.log("Signed in with google: ", result.user)
      })
      .catch( error => console.log("Couldnt log in with google: ", error))
  };


// Generate a user document on firestore
export const generateUserDocument = async (user, additionalData) => {
    if (!user) {
        console.log("no user found");
        return;
    }

    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { email, displayName, photoURL } = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("error creating user document", error)
        }
    }
    return getUserDocument(user.uid);
  };

//   Get a user document from firestore
const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error)
    }
}