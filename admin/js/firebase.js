import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"

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
const storage = getStorage(app)

const userCreds = JSON.parse(sessionStorage.getItem("user-creds"))
const userInfoJSON = sessionStorage.getItem("user-info")
let userInfo // Variável para armazenar o objeto userInfo

if (userInfoJSON) {
    userInfo = JSON.parse(userInfoJSON)
}

const name = document.getElementById("name")
const fname = document.getElementById("fname")
const lname = document.getElementById("lname")
const mail = document.getElementById("mail")
const username = document.getElementById("username")
const signoutBtn = document.getElementById("signoutbutton")

const Signout = () => {
    sessionStorage.removeItem("user-creds")
    sessionStorage.removeItem("user-info")
    window.location.href = "../../index.html"
}

const CheckCred = () => {
    if (!sessionStorage.getItem("user-creds") || !userInfo) {
        window.location.href = "../../index.html"
    } else {
        name.innerText = `${userInfo.firstname + " " + userInfo.lastname}`
        document.title = `Smart Savings | ${userInfo.firstname + " " + userInfo.lastname}`
        mail.value = userCreds.email
        fname.value = userInfo.firstname
        lname.value = userInfo.lastname
        username.value = userInfo.username
    }
}

document.addEventListener("DOMContentLoaded", function () {
    CheckCred() // Chama CheckCred quando o DOM é completamente carregado

    // Adiciona um ouvinte de evento de clique ao link
    signoutBtn.addEventListener("click", function (event) {
        event.preventDefault() // Evita que o link redirecione imediatamente

        // Chama a função Signout quando o link for clicado
        Signout()
    })
})

const fileInput = document.getElementById("fileInput") // Adicione um input de arquivo no seu HTML com o ID "fileInput"

const uploadProfileImage = () => {
    const file = fileInput.files[0]

    if (file) {
        // Obtenha a referência diretamente do storage
        const storageRef = getStorage().ref(`users/${userCreds.uid}/profile.jpg`)

        storageRef
            .put(file)
            .then(() => {
                console.log("Image uploaded successfully!")
            })
            .catch((error) => {
                console.error("Error uploading image:", error)
            })
    }
}

const uploadButton = document.getElementById("uploadButton")

uploadButton.addEventListener("click", uploadProfileImage)
