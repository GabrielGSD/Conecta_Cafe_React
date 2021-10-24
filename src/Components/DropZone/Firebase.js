import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'

const API_KEY = `${process.env.REACT_APP_API_KEY || "NOT FOUND!"}`
const AUTHDOMAIN = `${process.env.REACT_APP_AUTHDOMAIN || "NOT FOUND!"}`
const PROJECTID = `${process.env.REACT_APP_PROJECTID || "NOT FOUND!"}`
const STORAGEBUCKET = `${process.env.REACT_APP_STORAGEBUCKET || "NOT FOUND!"}`
const MESSAGINGSENDERID = `${process.env.REACT_APP_MESSAGINGSENDERID || "NOT FOUND!"}`
const APPID = `${process.env.REACT_APP_APPID || "NOT FOUND!"}`
const MEASUREMENTID = `${process.env.REACT_APP_MEASUREMENTID || "NOT FOUND!"}`

const firebaseConfig = {
    apiKey:API_KEY,
    authDomain:AUTHDOMAIN,
    projectId:PROJECTID,
    storageBucket:STORAGEBUCKET,
    messagingSenderId:MESSAGINGSENDERID,
    appId:APPID,
    measurementId:MEASUREMENTID,
}

firebase.default.initializeApp(firebaseConfig);

const storage = firebase.storage()

export { storage, firebase as default }
