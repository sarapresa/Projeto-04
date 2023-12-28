// Elements by ID
const sideMenu = document.querySelector("aside")
const menuBtn = document.getElementById("menu-btn")
const closeBtn = document.getElementById("close-btn")

const currentPageId = window.currentPageId

// Nav Bar Active
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the sidebar content
    fetch("sidebar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("sidebar-container").innerHTML = data

            var activeLink = document.getElementById(currentPageId)
            if (activeLink) {
                activeLink.classList.add("active")
            }
        })
})

// Mobile Buttons
menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block"
})

closeBtn.addEventListener("click", () => {
    sideMenu.style.display = "none"
})

// Dark Mode Toogle
document.addEventListener("DOMContentLoaded", () => {
    const darkModeToggle = document.getElementById("darkModeToggle")

    // Verificar se o elemento existe antes de prosseguir
    if (!darkModeToggle) {
        console.error("Elemento 'darkModeToggle' não encontrado.")
        return
    }

    const setDarkMode = (isDarkMode) => {
        document.body.classList.toggle("dark-mode-variables", isDarkMode)
        sessionStorage.setItem("darkMode", isDarkMode)
    }

    darkModeToggle.addEventListener("change", () => {
        setDarkMode(darkModeToggle.checked)
    })

    // Inicializar o modo escuro com base no sessionStorage
    const savedDarkMode = sessionStorage.getItem("darkMode")

    if (savedDarkMode !== null) {
        const isDarkMode = savedDarkMode === "true"
        setDarkMode(isDarkMode)
        darkModeToggle.checked = isDarkMode
    }
})

// Add Orders Function
Orders.forEach((order) => {
    const tr = document.createElement("tr")
    const trContent = `
        <td>${order.productName}</td>
        <td>${order.productNumber}</td>
        <td>${order.paymentStatus}</td>
        <td class="${order.status === "Declined" ? "danger" : order.status === "Pending" ? "warning" : "primary"}">${order.status}</td>
        <td class="primary">Details</td>
    `
    tr.innerHTML = trContent
    document.querySelector("table tbody").appendChild(tr)
})
