import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_API_KEY || "NOT FOUND!"}`,
    authDomain: `${process.env.REACT_APP_AUTHDOMAIN || "NOT FOUND!"}`,
    projectId: `${process.env.REACT_APP_PROJECTID || "NOT FOUND!"}`,
    storageBucket: `${process.env.REACT_APP_STORAGEBUCKET || "NOT FOUND!"}`,
    messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID || "NOT FOUND!"}`,
    appId: `${process.env.REACT_APP_APPID || "NOT FOUND!"}`,
    measurementId: `${process.env.REACT_APP_MEASUREMENTID || "NOT FOUND!"}`
}

firebase.default.initializeApp(firebaseConfig);

const storage = firebase.storage()

export { storage, firebase as default }
