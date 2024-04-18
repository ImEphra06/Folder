let ctx = {};

function setupDropdown (item, type) {
    const container = document.querySelector("." + item);
    const btn = document.getElementById(type + "Btn");
    const list = document.querySelector(".dropdown-content-" + item);
    
    btn.addEventListener("click", () => {
        list.style.display = (list.style.display === "block") ? "none" : "block";
        container.classList.toggle("filter-close", list.style.display === "none");
    });
}

function initEvent() {
    setupDropdown ("ingredients", "ingredient");
    setupDropdown ("appliances", "appliance");
    setupDropdown ("ustensils", "ustensil");
}

window.addEventListener("load", async() => {
    initEvent();
    await getRecipes();
    filterRecipes();
});