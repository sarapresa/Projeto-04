// Nav Bar Active
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the sidebar content
    fetch("sidebar.html")
        .then((response) => response.text())
        .then((data) => {
            document.getElementById("sidebar-container").innerHTML = data

            // Use a variável global currentPageId
            var currentPageId = window.currentPageId

            // Find the link with the corresponding ID and add the "active" class
            var activeLink = document.getElementById(currentPageId)
            if (activeLink) {
                activeLink.classList.add("active")
            }
        })
})
