window.onload = () => {
    const menuButton = document.querySelector("#menuButton");
    const nav = document.getElementsByTagName("nav")[0];
    menuButton.addEventListener("click", () => {
        var isActive = menuButton.classList.toggle("Active");
        nav.classList.toggle("Active", isActive);
    });
};