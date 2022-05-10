const express = require('express')
const app = module.exports = express()
const path = require('path')

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMwVQovJOraI-hE2P8kNPh1Yz-H9Sy8fU",
  authDomain: "miniblog-349615.firebaseapp.com",
  projectId: "miniblog-349615",
  storageBucket: "miniblog-349615.appspot.com",
  messagingSenderId: "302805054463",
  appId: "1:302805054463:web:6b728120cb5e785050edca",
  measurementId: "G-VC3SNPM322"
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
const analytics = getAnalytics(app2);

const port = process.env.PORT || 8080

app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./routers/pages.js'))
app.use(require('./routers/api.js'))
console.log(`Preparing to listen post ${port}`)
if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}
