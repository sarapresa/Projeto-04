import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js"
import { getDatabase, set, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js"
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js"
import { showAlert } from "./main.js"

const firebaseConfig = {
    apiKey: "AIzaSyBB1p7R2VHpcdcaql9UWEf_qzzeMQ4koGE",
    authDomain: "smart-savings-a369a.firebaseapp.com",
    databaseURL: "https://smart-savings-a369a-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "smart-savings-a369a",
    storageBucket: "smart-savings-a369a.appspot.com",
    messagingSenderId: "646945260742",
    appId: "1:646945260742:web:1ed62af60e1b85ad9ac3c7",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const storageRef = storage.ref()
const db = getDatabase(app)
const dbref = ref(db)

const RegisterForm = document.getElementById("RegisterForm")
const LoginForm = document.getElementById("LoginForm")
const ResetForm = document.getElementById("ResetForm")

const handleRegistration = async (evt) => {
    evt.preventDefault()

    const { username, fname, lname, email, password } = evt.target.elements

    try {
        const credentials = await createUserWithEmailAndPassword(auth, email.value, password.value)

        await set(ref(db, `users/${credentials.user.uid}`), {
            firstname: fname.value,
            lastname: lname.value,
            username: username.value,
            email: email.value,
        })

        showAlert("Your account has been successfully created!", "success")

        setTimeout(() => {
            window.location.href = "index.html"
        }, 1000)
    } catch (error) {
        handleAuthError(error)
        console.error(error)
    }
}

const handleLogin = async (evt) => {
    evt.preventDefault()

    const { email, password } = evt.target.elements

    try {
        const credentials = await signInWithEmailAndPassword(auth, email.value, password.value)
        const snapshot = await get(child(dbref, `users/${credentials.user.uid}`))

        if (snapshot.exists()) {
            const userInfo = {
                username: snapshot.val().username,
                firstname: snapshot.val().firstname,
                lastname: snapshot.val().lastname,
            }

            sessionStorage.setItem("user-info", JSON.stringify(userInfo))
            sessionStorage.setItem("user-creds", JSON.stringify(credentials.user))
            window.location.href = "./admin/index.html"
        }
    } catch (error) {
        handleAuthError(error)
        console.error(error)
    }
}

const handleReset = async (evt) => {
    evt.preventDefault()

    const { email } = evt.target.elements

    try {
        await sendPasswordResetEmail(auth, email.value)
        showAlert("The password reset link has been sent!", "success")
        setTimeout(() => {
            window.location.href = "index.html"
        }, 1000)
    } catch (error) {
        handleAuthError(error)
        console.error(error)
    }
}

const handleAuthError = (error) => {
    const errorCode = error.code

    switch (errorCode) {
        case "auth/email-already-in-use":
            showAlert("The email you entered is already in use", "error")
            break
        case "auth/invalid-email":
            showAlert("Please enter a valid email", "error")
            break
        case "auth/weak-password":
            showAlert("The password must be at least 6 characters long", "error")
            break
        case "auth/invalid-credential":
            showAlert("Your credentials are not valid", "error")
            break
        case "auth/missing-email":
            showAlert("Please enter an email", "error")
            break
        default:
            showAlert(error.message, "error")
    }
}

if (RegisterForm) {
    RegisterForm.addEventListener("submit", handleRegistration)
}

if (LoginForm) {
    LoginForm.addEventListener("submit", handleLogin)
}

if (ResetForm) {
    ResetForm.addEventListener("submit", handleReset)
}
