let ctx = {};

window.addEventListener("load", () => {
    ctx.container = document.querySelector(".ingredients");
    ctx.btn = document.getElementById("ingredientBtn");
    ctx.list = document.querySelector(".dropdown-content-ingredients");
    
    ctx.btn.addEventListener("click", () => {
        ctx.list.style.display = (ctx.list.style.display === "block") ? "none" : "block";
        ctx.container.classList.toggle("ingredients-close", ctx.list.style.display === "none");
    });
});