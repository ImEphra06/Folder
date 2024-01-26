let ingredients = [];

function extractIngredients(_recipes) {
    ingredients = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeIngredients = _recipes[i].ingredients;

        for (let j = 0; j < recipeIngredients.length; j++) {
            let found = false;
            const currentIngredient = recipeIngredients[j].ingredient.toLowerCase();

            for (let k = 0; k < ingredients.length; k++) {
                if (ingredients[k].toLowerCase() === currentIngredient) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                ingredients.push(currentIngredient);
            }
        }
    }
}