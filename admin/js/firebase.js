const userCreds = JSON.parse(sessionStorage.getItem("user-creds"))
const userInfoJSON = sessionStorage.getItem("user-info") // Armazenar o valor original

let userInfo // Variável para armazenar o objeto userInfo

if (userInfoJSON) {
    userInfo = JSON.parse(userInfoJSON)
}

const name = document.getElementById("name")
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
