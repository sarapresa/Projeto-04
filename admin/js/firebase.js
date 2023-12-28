const userCreds = JSON.parse(sessionStorage.getItem("user-creds"))
const userInfo = JSON.parse(sessionStorage.getItem("user-info"))

const name = document.getElementById("name")
const signoutBtn = document.getElementById("signoutbutton")

const Signout = () => {
    sessionStorage.removeItem("user-creds")
    sessionStorage.removeItem("user-info")
    window.location.href = "../../index.html"
}

const CheckCred = () => {
    if (!sessionStorage.getItem("user-creds")) window.location.href = "../../index.html"
    else {
        name.innerText = `${userInfo.firstname + " " + userInfo.lastname}`
        document.title = `Smart Savings | ${userInfo.firstname + " " + userInfo.lastname}`
    }
}

window.addEventListener("load", CheckCred)
signoutBtn.addEventListener("click", Signout)
