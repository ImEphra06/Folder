function extractIngredients(_recipes) {
    ctx.ingredients = [];

    _recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const currentIngredient = ingredient.ingredient.toLowerCase();
            const isDuplicate = ctx.ingredients.includes(currentIngredient);

            if (!isDuplicate) {
                const movedIngredients = Array.from(document.getElementById(`insistanteContentingredients`).children);
                const isMoved = movedIngredients.some(item => item.textContent.toLowerCase() === currentIngredient);

                if (!isMoved) {
                    ctx.ingredients.push(currentIngredient);
                }
            }
        });
    });
}