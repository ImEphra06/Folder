 // Récupération des données de l'éléments recipes dans le fichiers JSON
 async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    //et bien retourner le tableau recipes  seulement une fois récupéré
    return (data.recipes)
}

// Utilisation des données souhaitées
function recipeTemplate(data) {
    const { image, time, name, description, ingredient, quantity, unit } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");

        const recipesImg = document.createElement("img");
        recipesImg.src = image;
        recipesImg.setAttribute('aria-label', 'Recette - ' + name);
        const recipesTime = document.createElement("h2");
        recipesTime.textContent = time;
        const recipesName = document.createElement("h1");
        recipesName.textContent = name;
        const recipesSTitle1 = document.createElement("h3");
        recipesSTitle1.textContent = `RECETTE`;
        const recipesDescription = document.createElement("h4");
        recipesDescription.textContent = description;
        const recipesSTitle2 = document.createElement("h3");
        recipesSTitle2.textContent = `INGRÉDIENT`;
        const recipesIngredient = document.createElement("h5");
        recipesIngredient.textContent = `${ingredient}`;
        const recipesQuantity = document.createElement("h6");
        recipesQuantity.textContent = `${quantity} ${unit}`;

        article.appendChild(recipesImg);
        recipesImg.appendChild(recipesTime);
        article.appendChild(recipesName);
        article.appendChild(recipesSTitle1);
        article.appendChild(recipesDescription);
        article.appendChild(recipesSTitle2);
        article.appendChild(recipesIngredient);
        article.appendChild(recipesQuantity);

        return article;
    }
    return { image, time, name, description, ingredient, quantity, unit, getRecipeCardDOM };
}

async function displayData(recipes) {
    const recipeCards = document.querySelector(".recipes-cards");

    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const recipes = await getRecipes();
    displayData(recipes);
}

window.onload = function () {
    init();
};