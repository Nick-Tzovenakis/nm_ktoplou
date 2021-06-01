const navToggle = document.getElementById("navToggle");
const navCloseBtn = document.getElementById("navCloseBtn");
const drawer = document.getElementById("drawer");

navToggle.addEventListener("click", (e) => {
    drawer.classList.add("nav-opened");
    e.preventDefault();
});

navCloseBtn.addEventListener("click", (e) => {
    drawer.classList.remove("nav-opened");
    e.preventDefault();
});
