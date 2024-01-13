import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyBB1p7R2VHpcdcaql9UWEf_qzzeMQ4koGE",
    authDomain: "smart-savings-a369a.firebaseapp.com",
    databaseURL: "https://smart-savings-a369a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart-savings-a369a",
    storageBucket: "smart-savings-a369a.appspot.com",
    messagingSenderId: "646945260742",
    appId: "1:646945260742:web:1ed62af60e1b85ad9ac3c7",
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const userCreds = JSON.parse(sessionStorage.getItem("user-creds"))
const userInfoJSON = sessionStorage.getItem("user-info")

let userInfo

if (userInfoJSON) {
    userInfo = JSON.parse(userInfoJSON)
}

const name = document.getElementById("name")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const bigName = document.getElementById("bigName")
const mail = document.getElementById("mail")
const username = document.getElementById("username")
const signoutBtn = document.getElementById("signoutbutton")
const saveBtn = document.getElementById("savebutton")

const Signout = () => {
    sessionStorage.removeItem("user-creds")
    sessionStorage.removeItem("user-info")
    window.location.href = "../index.html"
}

const updatePageElements = (updatedUserInfo) => {
    name.innerText = `${updatedUserInfo.firstname + " " + updatedUserInfo.lastname}`
    bigName.innerText = `${updatedUserInfo.firstname + " " + updatedUserInfo.lastname}`
    document.title = `Smart Savings | ${updatedUserInfo.firstname + " " + updatedUserInfo.lastname}`
    mail.value = userCreds.email
    fname.value = updatedUserInfo.firstname
    lname.value = updatedUserInfo.lastname
    username.value = updatedUserInfo.username
}

const UpdateFirebase = () => {
    const updatedUserInfo = {
        firstname: fname.value,
        lastname: lname.value,
        username: username.value,
        email: mail.value,
    }

    const userId = userCreds.uid
    const userRef = ref(db, `users/${userId}`)

    set(userRef, updatedUserInfo)
        .then(() => {
            console.log("Data updated in Firebase")
            updatePageElements(updatedUserInfo)
            sessionStorage.setItem("user-info", JSON.stringify(updatedUserInfo))
        })
        .catch((error) => {
            console.error("Error updating data in Firebase:", error)
        })
}

if (saveBtn) {
    saveBtn.addEventListener("click", () => UpdateFirebase(db))
}

const CheckCred = () => {
    const bigNameElement = document.getElementById("bigName")

    if (!sessionStorage.getItem("user-creds") || !userInfo) {
        window.location.href = "../../index.html"
    } else {
        name.innerText = `${userInfo.firstname + " " + userInfo.lastname}`
        bigName.innerText = `${userInfo.firstname + " " + userInfo.lastname}`
        document.title = `Smart Savings | ${userInfo.firstname + " " + userInfo.lastname}`
        mail.value = userCreds.email
        fname.value = userInfo.firstname
        lname.value = userInfo.lastname
        username.value = userInfo.username
    }
}

document.addEventListener("DOMContentLoaded", function () {
    CheckCred()
    if (signoutBtn) {
        signoutBtn.addEventListener("click", function (event) {
            event.preventDefault()
            Signout()
        })
    }
})
