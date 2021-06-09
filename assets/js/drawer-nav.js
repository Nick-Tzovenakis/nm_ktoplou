window.addEventListener('DOMContentLoaded', (event) => {
    const navToggle = document.getElementById("navToggle");
    const drawer = document.getElementById("drawer");

    navToggle.addEventListener("click", (e) => {
        if (!navToggle.classList.contains("active-one")) {
            navToggle.classList.add("active-one");
            drawer.classList.add("nav-opened");
        } else {
            navToggle.classList.remove("active-one");
            drawer.classList.remove("nav-opened");
        }

        e.preventDefault();
    });
});