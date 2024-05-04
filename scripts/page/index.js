const recipes = [];
 
 // Récupération des données de l'éléments recipes dans le fichiers JSON
 async function getRecipes() {
    const response = await fetch("data/recipes.json");
    const data = await response.json();
    recipes.push(...data.recipes);
}

/***** FONCTION DE FILTRAGE *****/
function filterRecipes () {
    let _recipes = [...recipes];

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

    /***** CHAMP DE RECHERCHE *****/
    const inputValue = document.querySelector(".search-txt").value.trim().toLowerCase();

    if (inputValue.length >= 3) {
        _recipes = _recipes.filter(recipe => {
            const titleMatch = recipe.name.toLowerCase().includes(inputValue);
            const ingredientsMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(inputValue));
            const descriptionMatch = recipe.description.toLowerCase().includes(inputValue);
            return titleMatch || ingredientsMatch || descriptionMatch;
        });

    }
}


/***** FONCTIONS GENERALES UTILISEES POUR LES 3 FILTRES *****/
function fillFilterList(data, label, moved) {
    const dropdownContent = document.getElementById(label + 'Container');
	dropdownContent.innerHTML = '';

    data.forEach(item => {
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
    });
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
            const tagsContent = Array.from(document.querySelectorAll('.tagsContent')).find(item => item.textContent === cloned.textContent);
            insistanteContent.removeChild(insistanteClose.parentElement);
            tagsContent.parentElement.removeChild(tagsContent);
            filterRecipes();
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
    // Récupérer les noms des ingrédients sélectionnés dans insistanteContentIngredient
    const selectedIngredients = Array.from(document.querySelectorAll('#insistanteContentingredients .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedIngredients.length === 0) {
        return(_recipes);
    }

    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété ingredient est une chaîne de caractères
        const recipeIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient.toLocaleLowerCase());
        return selectedIngredients.every(selectedIngredient => recipeIngredients.includes(selectedIngredient));
    });
}

// Remplir la liste des ingrédients
let dropdownContentIngredient = null;
let vectorIngredients = null;

function displayIngredients() {
	fillFilterList(ctx.ingredients, "ingredients", document.getElementById(`insistanteContentingredients`).children);
}

/***** APPLIANCES *****/
function filterByAppliances(_recipes) {
    // Récupérer les noms des appareils sélectionnés dans insistanteContentAppliance
    const selectedAppliances = Array.from(document.querySelectorAll('#insistanteContentappliances .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedAppliances.length === 0) {
        return _recipes;
    }
    
    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété appliance est une chaîne de caractères
        const recipeAppliances = Array.isArray(recipe.appliance) ? recipe.appliance.map(a => a.toLowerCase()) : [recipe.appliance.toLowerCase()];
        return selectedAppliances.every(selectedAppliance => recipeAppliances.includes(selectedAppliance));
    });
}

// Remplir la liste des appareils
let dropdownContentAppliances = null;
let vectorAppliances = null;

function displayAppliances() {
	fillFilterList(ctx.appliances, "appliances", document.getElementById(`insistanteContentappliances`).children);
}


/***** USTENSILS *****/
function filterByUstensils(_recipes) {
    // Récupérer les noms des ustensiles sélectionnés dans insistanteContentUstensil
    const selectedUstensils = Array.from(document.querySelectorAll('#insistanteContentustensils .content')).map(item => item.textContent.trim().toLocaleLowerCase());
    if (selectedUstensils.length === 0) {
        return _recipes;
    }
    
    // Filtrer les recettes
    return _recipes.filter(recipe => {
        // Vérifier si la propriété Ustensil est une chaîne de caractères
        const recipeUstensils = Array.isArray(recipe.ustensils) ? recipe.ustensils.map(a => a.toLowerCase()) : [recipe.ustensils.toLowerCase()];
        return selectedUstensils.every(selectedUstensil => recipeUstensils.includes(selectedUstensil));
    });
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


/***** Utilisation des données souhaitées *****/ 
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

function displayRecipes(_recipes) {
    const recipeCards = document.querySelector(".recipes-cards");
	recipeCards.innerHTML = "";

    _recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const recipeCardDOM = recipeModel.getRecipeCardDOM();
        recipeCards.appendChild(recipeCardDOM);
    });

	nbRecette();
}

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

        if (inputValue.length >= 3) {
            const filteredIngredients = ctx.ingredients.filter(ingredient => {
                return ingredient.toLowerCase().includes(inputValue);
            });

            fillFilterList(filteredIngredients, "ingredients", document.getElementById(`insistanteContentingredients`).children);
        } else {
            displayIngredients();
        }
    });

    document.querySelector('.search-appliances-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();

        if (inputValue.length >= 3) {
            const filteredAppliances = ctx.appliances.filter(appliance => {
                return appliance.toLowerCase().includes(inputValue);
            });

            fillFilterList(filteredAppliances, "appliances", document.getElementById(`insistanteContentappliances`).children);
        } else {
            displayAppliances();
        }
    });

    document.querySelector('.search-ustensils-txt').addEventListener('input', function() {
        const inputValue = this.value.trim().toLowerCase();

        if (inputValue.length >= 3) {
            const filteredUstensils = ctx.ustensils.filter(ustensil => {
                return ustensil.toLowerCase().includes(inputValue);
            });

            fillFilterList(filteredUstensils, "ustensils", document.getElementById(`insistanteContentustensils`).children);
        } else {
            displayUstensils();
        }
    });
}
