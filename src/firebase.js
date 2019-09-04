import firebase from "firebase"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCWeBUEpbFR9XfiXXQjeGL49HViGYBQlSc",
    authDomain: "todo-vue-da652.firebaseapp.com",
    databaseURL: "https://todo-vue-da652.firebaseio.com",
    projectId: "todo-vue-da652",
    storageBucket: "",
    messagingSenderId: "797042809136",
    appId: "1:797042809136:web:2f013cd039e71038"
  };

const fireBaseApp = firebase.initializeApp(firebaseConfig)
const firestore = fireBaseApp.firestore()

export default firestore