function extractIngredients(_recipes) {
    ctx.ingredients = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeIngredients = _recipes[i].ingredients;

        for (let j = 0; j < recipeIngredients.length; j++) {
            let found = false;
            const currentIngredient = recipeIngredients[j].ingredient.toLowerCase();

            for (let k = 0; k < ctx.ingredients.length; k++) {
                if (ctx.ingredients[k].toLowerCase() === currentIngredient) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                const movedIngredients = document.getElementById(`insistanteContentingredients`).children;
                for(let k = 0; k < movedIngredients.length; k++) {
                    if (movedIngredients[k].textContent.toLowerCase() === currentIngredient) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                ctx.ingredients.push(currentIngredient);
            }
        }
    }
}