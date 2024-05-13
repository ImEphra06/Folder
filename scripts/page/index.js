const recipes = [];

// Récupération des données de l'éléments recipes dans le fichiers JSON
async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipes.push(...data.recipes);
}

/***** FONCTION DE FILTRAGE *****/
function filterRecipes() {
    let _recipes = [...recipes];
    const inputValue = document.querySelector(".search-txt").value.trim().toLowerCase();

    // CHAMP DE RECHERCHE
    if (inputValue.length >= 3) {
        const filteredRecipes = [];
        for (let i = 0; i < _recipes.length; i++) {
            const recipe = _recipes[i];
            const titleMatch = recipe.name.toLowerCase().includes(inputValue);
            let ingredientsMatch = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(inputValue)) {
                    ingredientsMatch = true;
                    break;
                }
            }
            const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);
            if (titleMatch || ingredientsMatch || descriptionMatch) {
                filteredRecipes.push(recipe);
            }
        }
        _recipes = filteredRecipes;
    
        const noMatch = document.querySelector('.no-match');
        if (_recipes.length === 0) {
            noMatch.textContent = `${inputValue} n'est contenu dans aucune recherche...`;
        } else {
            noMatch.textContent = "";
        }
    }

    _recipes = filterByIngredients(_recipes);
    _recipes = filterByAppliances(_recipes);
    _recipes = filterByUstensils(_recipes);

    displayRecipes(_recipes);

    extractIngredients(_recipes);
    extractAppliances(_recipes);
    extractUstensils(_recipes);

    displayIngredients();
    displayAppliances();
    displayUstensils();
}


/***** FONCTIONS GENERALES UTILISEES POUR LES 3 FILTRES *****/
function fillFilterList(data, label, moved) {
    const dropdownContent = document.getElementById(label + 'Container');
    dropdownContent.innerHTML = '';

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const div = document.createElement('div');
        div.textContent = item;
        div.className = 'content';
        dropdownContent.appendChild(div);

        // Ajouter un gestionnaire d'événements au clic sur chaque élément
        div.addEventListener('click', () => {
            moveItemToInsistante(div, moved, label);
            createTag(div.textContent, label);
            filterRecipes();
        });
    }
}

function moveItemToInsistante(item, moved, label) {
    // Vérifier si l'élément n'a pas déjà été déplacé
    if (!Array.from(moved).includes(item)) {
        const cloned = item.cloneNode(true);
        cloned.classList.add('contentBis');

        // Ajouter le clone à "insistanteContent"
        const insistanteContent = document.getElementById('insistanteContent' + label);
        insistanteContent.appendChild(cloned);
        const insistanteClose = document.createElement('img');
        insistanteClose.src = 'images/icons/tags_close.svg';
        insistanteClose.classList.add('insistantClose');
        insistanteClose.alt = 'Supprimer l élément';
        cloned.appendChild(insistanteClose);

        insistanteClose.addEventListener('click', () => {
            closeList(label);
            const insistanteContent = document.getElementById(`insistanteContent${label}`);
            const clonedTextContent = cloned.textContent;
            const tagsContentList = document.querySelectorAll('.tagsContent');
            for (let i = 0; i < tagsContentList.length; i++) {
                const tagsContent = tagsContentList[i];
                if (tagsContent.textContent === clonedTextContent) {
                    insistanteContent.removeChild(insistanteClose.parentElement);
                    tagsContent.parentElement.removeChild(tagsContent);
                    filterRecipes();
                    break;
                }
            }
        });

        closeList(label);

        // Vérifier si insistanteContent est vide
        if (insistanteContent.children.length > 0) {
            insistanteContent.style.display = 'block';
        }

        filterRecipes();
    }
}


/***** INGREDIENTS *****/
function filterByIngredients(_recipes) {
    const selectedIngredients = [];
    const contentItems = document.querySelectorAll('#insistanteContentingredients .content');
    for (let i = 0; i < contentItems.length; i++) {
        selectedIngredients.push(contentItems[i].textContent.trim().toLocaleLowerCase());
    }

    if (selectedIngredients.length === 0) {
        return _recipes;
    }

    const filteredRecipes = [];
    for (let i = 0; i < _recipes.length; i++) {
        const recipe = _recipes[i];
        const recipeIngredients = [];
        for (let j = 0; j < recipe.ingredients.length; j++) {
            recipeIngredients.push(recipe.ingredients[j].ingredient.toLocaleLowerCase());
        }
        let includeAll = true;
        for (let j = 0; j < selectedIngredients.length; j++) {
            if (!recipeIngredients.includes(selectedIngredients[j])) {
                includeAll = false;
                break;
            }
        }
        if (includeAll) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

// Remplir la liste des ingrédients
let dropdownContentIngredient = null;
let vectorIngredients = null;

function displayIngredients() {
    fillFilterList(ctx.ingredients, "ingredients", document.getElementById(`insistanteContentingredients`).children);
}


/***** APPLIANCES *****/
function filterByAppliances(_recipes) {
    const selectedAppliances = [];
    const contentItems = document.querySelectorAll('#insistanteContentappliances .content');
    for (let i = 0; i < contentItems.length; i++) {
        selectedAppliances.push(contentItems[i].textContent.trim().toLocaleLowerCase());
    }

    if (selectedAppliances.length === 0) {
        return _recipes;
    }

    const filteredRecipes = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipe = _recipes[i];
        const recipeAppliances = [];

        if (Array.isArray(recipe.appliance)) {
            for (let k = 0; k < recipe.appliance.length; k++) {
                recipeAppliances.push(recipe.appliance[k].toLowerCase());
            }
        } else {
            recipeAppliances.push(recipe.appliance.toLowerCase());
        }
    
        let includeAll = true;

        for (let j = 0; j < selectedAppliances.length; j++) {
            if (!recipeAppliances.includes(selectedAppliances[j])) {
                includeAll = false;
                break;
            }
        }

        if (includeAll) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

// Remplir la liste des appareils
let dropdownContentAppliances = null;
let vectorAppliances = null;

function displayAppliances() {
    fillFilterList(ctx.appliances, "appliances", document.getElementById(`insistanteContentappliances`).children);
}


/***** USTENSILS *****/
function filterByUstensils(_recipes) {
    const selectedUstensils = [];
    const contentItems = document.querySelectorAll('#insistanteContentustensils .content');
    
    for (let i = 0; i < contentItems.length; i++) {
        selectedUstensils.push(contentItems[i].textContent.trim().toLocaleLowerCase());
    }

    if (selectedUstensils.length === 0) {
        return _recipes;
    }

    const filteredRecipes = [];
    for (let i = 0; i < _recipes.length; i++) {
        const recipe = _recipes[i];
        let recipeUstensils;
    
        if (Array.isArray(recipe.ustensils)) {
            recipeUstensils = [];
            for (let i = 0; i < recipe.ustensils.length; i++) {
                recipeUstensils.push(recipe.ustensils[i].toLowerCase());
            }
        } else {
            recipeUstensils = [recipe.ustensils.toLowerCase()];
        }
    
        let includeAll = true;
    
        for (let j = 0; j < selectedUstensils.length; j++) {
            let found = false;
    
            for (let k = 0; k < recipeUstensils.length; k++) {
                if (selectedUstensils[j] === recipeUstensils[k]) {
                    found = true;
                    break;
                }
            }
    
            if (!found) {
                includeAll = false;
                break;
            }
        }
    
        if (includeAll) {
            filteredRecipes.push(recipe);
        }
    }
    return filteredRecipes;
}

// Remplir la liste des ustensiles
let dropdownContentUstensils = null;
let vectorUstensils = null;

function displayUstensils() {
    fillFilterList(ctx.ustensils, "ustensils", document.getElementById(`insistanteContentustensils`).children);
}


/***** AFFICHAGE NOMBRE DE RECETTES *****/
function nbRecette() {
    const nbRecetteElement = document.querySelector('.nbRecette');
    const nbRecipesDisplayed = document.querySelectorAll('.card').length;
    nbRecetteElement.textContent = `${nbRecipesDisplayed} recettes`;
}


/***** CRéATION DES CARDS DES RECETTES *****/
function recipeTemplate(data) {
    const { image, time, name, description, ingredients, quantity, unit } = data;

    function getRecipeCardDOM() {
        const article = document.createElement("article");
        article.className = 'card';

        const cardContent = document.createElement("div");
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

        for (let i = 0; i < ingredients.length; i++) {
            const ingredient = ingredients[i];
            const div = document.createElement("div");
            div.classList.add("ingredient");
            const ingredientName = document.createElement("h4");
            ingredientName.classList.add("ingredient-name");
            ingredientName.textContent = ingredient.ingredient;
            div.appendChild(ingredientName);
            const ingredientUnit = document.createElement("h5");
            ingredientUnit.textContent = ingredient.quantity + (ingredient.unit ? " " + ingredient.unit : "");
            div.appendChild(ingredientUnit);
            ingredientsList.appendChild(div);
        }

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


/***** AFFICHAGE DES RECETTES *****/
function displayRecipes(_recipes) {
    const recipeCards = document.querySelector(".recipes-cards");
    recipeCards.innerHTML = "";

    for (let i = 0; i < _recipes.length; i++) {
        const recipe = _recipes[i];
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    }

    nbRecette();
}


/***** INITIALISATION DES VARIABLES *****/
function initReferences() {
    dropdownContentIngredient = document.querySelector('.dropdown-content-ingredients');
    vectorIngredients = document.querySelector('.vectorIngredient');
    dropdownContentAppliances = document.querySelector('.dropdown-content-appliances');
    vectorAppliances = document.querySelector('.vectorAppliance');
    dropdownContentUstensils = document.querySelector('.dropdown-content-ustensils');
    vectorUstensils = document.querySelector('.vectorUstensil');

    // Recherche des recettes via la barre de recherche principale
    document.querySelector('.search-txt').addEventListener('input', filterRecipes);

    // Recherche des ingrédients, appareils et ustensiles via la barre de recherche du menu déroulant
    document.querySelector('.search-ingredients-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();
        const filteredIngredients = [];
    
        if (inputValue.length >= 3) {
            for (let i = 0; i < ctx.ingredients.length; i++) {
                const ingredient = ctx.ingredients[i];
                if (ingredient.toLowerCase().includes(inputValue)) {
                    filteredIngredients.push(ingredient);
                }
            }
            fillFilterList(filteredIngredients, "ingredients", document.getElementById(`insistanteContentingredients`).children);
        } else {
            displayIngredients();
        }
    });

    document.querySelector('.search-appliances-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();
        const filteredAppliances = [];
    
        if (inputValue.length >= 3) {
            for (let i = 0; i < ctx.appliances.length; i++) {
                const appliance = ctx.appliances[i];
                if (appliance.toLowerCase().includes(inputValue)) {
                    filteredAppliances.push(appliance);
                }
            }
            fillFilterList(filteredAppliances, "appliances", document.getElementById(`insistanteContentappliances`).children);
        } else {
            displayAppliances();
        }
    });
    
    document.querySelector('.search-ustensils-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();
        const filteredUstensils = [];
    
        if (inputValue.length >= 3) {
            for (let i = 0; i < ctx.ustensils.length; i++) {
                const ustensil = ctx.ustensils[i];
                if (ustensil.toLowerCase().includes(inputValue)) {
                    filteredUstensils.push(ustensil);
                }
            }
            fillFilterList(filteredUstensils, "ustensils", document.getElementById(`insistanteContentustensils`).children);
        } else {
            displayUstensils();
        }
    });
}