let ctx = {};
let cty = {};
let ctz = {};

window.addEventListener("load", () => {
    ctx.container = document.querySelector(".ingredients");
    ctx.btn = document.getElementById("ingredientBtn");
    ctx.list = document.querySelector(".dropdown-content-ingredients");
    
    ctx.btn.addEventListener("click", () => {
        ctx.list.style.display = (ctx.list.style.display === "block") ? "none" : "block";
        ctx.container.classList.toggle("ingredients-close", ctx.list.style.display === "none");
    });
});

window.addEventListener("load", () => {
    cty.container = document.querySelector(".appliances");
    cty.btn = document.getElementById("applianceBtn");
    cty.list = document.querySelector(".dropdown-content-appliances");
    
    cty.btn.addEventListener("click", () => {
        cty.list.style.display = (cty.list.style.display === "block") ? "none" : "block";
        cty.container.classList.toggle("appliances-close", cty.list.style.display === "none");
    });
});

window.addEventListener("load", () => {
    ctz.container = document.querySelector(".ustensils");
    ctz.btn = document.getElementById("ustensilBtn");
    ctz.list = document.querySelector(".dropdown-content-ustensils");
    
    ctz.btn.addEventListener("click", () => {
        ctz.list.style.display = (ctz.list.style.display === "block") ? "none" : "block";
        ctz.container.classList.toggle("ustensils-close", ctz.list.style.display === "none");
    });
});