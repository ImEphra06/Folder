const recipes = [];
 
 // Récupération des données de l'éléments recipes dans le fichiers JSON
 async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipes.push(...data.recipes);
}

function filterRecipes () {
    let _recipes = [...recipes];

    filterByIngredients(_recipes);

    filterByAppliances(_recipes);
    filterByUstensils(_recipes);
    filterBySearch(_recipes);

    displayRecipes(_recipes);

    extractIngredients(_recipes);
    extractAppliances(_recipes);
    extractUstensils(_recipes);

    displayIngredients();
    displayAppliances();
    displayUstensils();
}

function filterBySearch(_recipes) {

}

/***** INGREDIENTS *****/
function filterByIngredients(_recipes) {
    // Récupérer les noms des ingrédients sélectionnés dans insistanteContentIngredient
    const selectedIngredients = Array.from(document.querySelectorAll('#insistanteContentIngredient .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    
    // Filtrer les recettes
    _recipes = _recipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => selectedIngredients.includes(ingredient.ingredient.toLocaleLowerCase()));
    });
}

// Remplir la liste des ingrédients
const dropdownContentIngredient = document.querySelector('.dropdown-content-ingredients');
const vectorIngredients = document.querySelector('.vectorIngredients');
let movedIngredients = [];
let removedIngredients = [];


function displayIngredients() {
    
    const dropdownContent = document.getElementById('ingredientContainer');dropdownContent.innerHTML = '';

    ingredients.forEach(ingredient => {
        const ingredientItem = document.createElement('div');
        ingredientItem.textContent = ingredient;
        ingredientItem.className = 'content';
        dropdownContent.appendChild(ingredientItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        ingredientItem.addEventListener('click', () => {
            moveIngredientToInsistante(ingredientItem);
            createTag(ingredientItem.textContent);
            filterRecipes();
        });
    });
}

function moveIngredientToInsistante(ingredientItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedIngredients.includes(ingredientItem)) {
        const clonedIngredientItem = ingredientItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentIngredient');
        insistanteContent.appendChild(clonedIngredientItem);

        // Ajouter l'élément à la liste des déplacés
        movedIngredients.push(ingredientItem);

        // Supprimer l'élément de la liste
        ingredientItem.remove();

        // Fermer la liste des ingrédients
        dropdownContentIngredient.style.display = "none";
        vectorIngredients.classList.toggle('rotate-180');
        dropdownContentIngredient.classList.toggle('show');

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

document.getElementById('ingredientBtn').addEventListener('click', () => {
    displayIngredients();
    dropdownContentIngredient.classList.toggle('show');
    vectorIngredients.classList.toggle('rotate-180');
});


/***** APPLIANCES *****/
function filterByAppliances(_recipes) {
    /*// Récupérer les noms des appareils sélectionnés dans insistanteContentAppliance
    const selectedAppliances = Array.from(document.querySelectorAll('#insistanteContentAppliance .content')).map(item => item.textContent.trim());

    // Filtrer les recettes
    const filteredRecipes = _recipes.filter(recipe => {
        return recipe.appliances.some(appliance => selectedAppliances.includes(appliance.appliance));
    });*/
}

// Remplir la liste des appareils
const dropdownContentAppliances = document.querySelector('.dropdown-content-appliances');
const vectorAppliances = document.querySelector('.vectorAppliances');
let movedAppliances = [];
let removedAppliances = [];

function displayAppliances() {
    const dropdownContent = document.getElementById('applianceContainer');
    dropdownContent.innerHTML = '';

    appliances.forEach(appliance => {
        const applianceItem = document.createElement('div');
        applianceItem.textContent = appliance;
        applianceItem.className = 'content';
        dropdownContent.appendChild(applianceItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        applianceItem.addEventListener('click', () => {
            moveApplianceToInsistante(applianceItem);
            createTag(applianceItem.textContent);
            filterRecipes();
        });
    });
}

function moveApplianceToInsistante(applianceItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedAppliances.includes(applianceItem)) {
        const clonedApplianceItem = applianceItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentAppliance');
        insistanteContent.appendChild(clonedApplianceItem);

        // Ajouter l'élément à la liste des déplacés
        movedAppliances.push(applianceItem);

        // Supprimer l'élément de la liste
        applianceItem.remove();

        // Fermer la liste des ingrédients
        dropdownContentAppliances.style.display = "none";
        vectorAppliances.classList.toggle('rotate-180');
        dropdownContentAppliances.classList.toggle('show');

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

document.getElementById('applianceBtn').addEventListener('click', () => {
    displayAppliances();
    dropdownContentAppliances.classList.toggle('show');
    vectorAppliances.classList.toggle('rotate-180');
});


/***** USTENSILS *****/
function filterByUstensils(_recipes) {
    /*// Récupérer les noms des ustensils sélectionnés dans insistanteContentUstensil
    const selectedUstensils = Array.from(document.querySelectorAll('#insistanteContentUstensil .content')).map(item => item.textContent.trim());

    // Filtrer les recettes
    const filteredRecipes = _recipes.filter(recipe => {
        return recipe.ustensils.some(ustensil => selectedUstensils.includes(ustensil.ustensil));
    });*/
}

// Remplir la liste des ustensiles
const dropdownContentUstensils = document.querySelector('.dropdown-content-ustensils');
const vectorUstensils = document.querySelector('.vectorUstensils');
let movedUstensils = [];
let removedUstensils = [];

function displayUstensils() {
    const dropdownContent = document.getElementById('ustensilContainer');
    dropdownContent.innerHTML = '';

    ustensils.forEach(ustensil => {
        const ustensilItem = document.createElement('div');
        ustensilItem.textContent = ustensil;
        ustensilItem.className = 'content';
        dropdownContent.appendChild(ustensilItem);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        ustensilItem.addEventListener('click', () => {
            moveUstensilToInsistante(ustensilItem);
            createTag(ustensilItem.textContent);
            filterRecipes();
        });
    });
}

function moveUstensilToInsistante(ustensilItem) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!movedUstensils.includes(ustensilItem)) {
        const clonedUstensilItem = ustensilItem.cloneNode(true);

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContentUstensil');
        insistanteContent.appendChild(clonedUstensilItem);

        // Ajouter l'élément à la liste des déplacés
        movedUstensils.push(ustensilItem);

        // Supprimer l'élément de la liste
        ustensilItem.remove();

        // Fermer la liste des ingrédients
        dropdownContentUstensils.style.display = "none";
        vectorUstensils.classList.toggle('rotate-180');
        dropdownContentUstensils.classList.toggle('show');

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }
    }
}

document.getElementById('ustensilBtn').addEventListener('click', () => {
    displayUstensils();
    dropdownContentUstensils.classList.toggle('show');
    vectorUstensils.classList.toggle('rotate-180');
});


/***** AFFICHAGE NOMBRE DE RECETTES *****/
function nbRecette() {
    const nbRecetteElement = document.querySelector('.nbRecette');
    const nbRecipesDisplayed = document.querySelectorAll('.card').length;
    nbRecetteElement.textContent = `${nbRecipesDisplayed} recettes`;
}

// Utilisation des données souhaitées
function recipeTemplate(data) {
    const { image, time, name, description, ingredients, quantity, unit } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");
        article.className = 'card';
        
        const cardContent = document.createElement("div")
        cardContent.className = 'card-content';

        const recipesImg = document.createElement("img");
        recipesImg.src = image;
        recipesImg.setAttribute('aria-label', 'Recette - ' + name);
        const recipesTime = document.createElement("h2");
        recipesTime.textContent = `${time}min`;
        const recipesName = document.createElement("h1");
        recipesName.textContent = name;
        const recipesSTitle1 = document.createElement("h3");
        recipesSTitle1.textContent = `RECETTE`;
        const recipesDescription = document.createElement("p");
        recipesDescription.textContent = description;
        const recipesSTitle2 = document.createElement("h3");
        recipesSTitle2.textContent = `INGRÉDIENT`;

        const ingredientsList = document.createElement("div");
        ingredientsList.className = 'ingredients-list';
        ingredients.forEach((ingredient) => {
			const div = document.createElement("div");
			div.classList.add("ingredient");
			const ingredientName = document.createElement("h4");
			ingredientName.classList.add("ingredient-name");
			ingredientName.textContent = ingredient.ingredient;
			div.appendChild(ingredientName);
			const ingredientUnit = document.createElement("h5");
			ingredientUnit.textContent = ingredient.quantity + (ingredient.unit? " " + ingredient.unit:"");
			div.appendChild(ingredientUnit);
			ingredientsList.appendChild(div);
		});

        article.appendChild(recipesImg);
        article.appendChild(recipesTime);
        article.appendChild(cardContent);
        cardContent.appendChild(recipesName);
        cardContent.appendChild(recipesSTitle1);
        cardContent.appendChild(recipesDescription);
        cardContent.appendChild(recipesSTitle2);
        cardContent.appendChild(ingredientsList);

        return article;
    }
    return { image, time, name, description, ingredients, quantity, unit, getRecipeCardDOM };
}

async function displayRecipes(_recipes) {
    const recipeCards = document.querySelector(".recipes-cards");

    _recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    });
}

async function init() {
    await getRecipes();
    filterRecipes();
    nbRecette();
}

window.onload = async function () {
    await init();
};