// CUSTOM ALERT JS
const style = document.createElement("style")

style.innerHTML = `
.success-alert, .error-alert {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 20px;
    color: white;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    transition: opacity 0.5s ease;
    opacity: 0;
}

.success-alert {
    background-color: #4CAF50;
}

.error-alert {
    background-color: #FF0000;
}

@keyframes fadeIn {
    0% {opacity: 0;}
    100% {opacity: 1;}
}

@keyframes fadeOut {
    0% {opacity: 1;}
    100% {opacity: 0;}
}
`

document.head.appendChild(style)

export function showAlert(message, type) {
    var alertDiv = document.createElement("div")
    alertDiv.classList.toggle(type + "-alert", true)
    alertDiv.textContent = message

    let closeButton = document.createElement("span")
    closeButton.textContent = "×"
    closeButton.style.float = "right"
    closeButton.style.cursor = "pointer"
    closeButton.style.marginLeft = "15px"
    closeButton.style.fontSize = "22px"
    closeButton.style.lineHeight = "20px"
    closeButton.style.color = "white"
    closeButton.addEventListener("click", function () {
        if (!alertDiv.style.animation) {
            alertDiv.style.animation = "fadeOut 0.5s forwards"
        }
    })

    alertDiv.appendChild(closeButton)

    document.body.appendChild(alertDiv)

    setTimeout(function () {
        alertDiv.style.animation = "fadeIn 0.5s forwards"
    }, 0)

    alertDiv.addEventListener("animationend", function () {
        if (alertDiv.style.animation.includes("fadeOut")) {
            document.body.removeChild(alertDiv)
        }
    })

    setTimeout(function () {
        alertDiv.style.animation = "fadeOut 0.5s forwards"
    }, 2000)
}

export function showSuccessAlert(message) {
    showAlert(message, "success")
}

export function showErrorAlert(message) {
    showAlert(message, "error")
}

// DARK MODE TOGGLE JS
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle")

    // Verificar se o elemento existe antes de prosseguir
    if (!darkModeToggle) {
        console.error("Elemento 'darkModeToggle' não encontrado.")
        return
    }

    const savedDarkMode = sessionStorage.getItem("darkMode")

    const setDarkMode = (isDarkMode) => {
        document.body.classList.toggle("dark-mode", isDarkMode)
        sessionStorage.setItem("darkMode", isDarkMode)
        darkModeToggle.checked = isDarkMode
    }

    darkModeToggle.addEventListener("change", () => {
        setDarkMode(darkModeToggle.checked)
    })

    // Verificar se há um estado salvo e configurar o modo escuro
    if (savedDarkMode !== null) {
        setDarkMode(savedDarkMode === "true")
    }
})
