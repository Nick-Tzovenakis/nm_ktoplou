window.addEventListener('DOMContentLoaded', (event) => {
    const navToggle = document.getElementById("navToggle");
    const drawer = document.getElementById("drawer");

    navToggle.addEventListener("click", (e) => {
        if (!navToggle.classList.contains("active")) {
            navToggle.classList.add("active");
            drawer.classList.add("nav-opened");
        } else {
            navToggle.classList.remove("active");
            drawer.classList.remove("nav-opened");
        }

        e.preventDefault();
    });
});