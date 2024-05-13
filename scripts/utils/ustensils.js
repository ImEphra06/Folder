function extractUstensils(_recipes) {
    ctx.ustensils = [];

    _recipes.forEach(recipe => {
        const recipeUstensils = recipe.ustensils;

        recipeUstensils.forEach(ustensil => {
            const currentUstensil = ustensil.toLowerCase();
            const isDuplicate = ctx.ustensils.some(ust => ust.toLowerCase() === currentUstensil);

            if (!isDuplicate) {
                const movedUstensils = Array.from(document.querySelectorAll('#insistanteContentustensils .content')).map(item => item.textContent.trim().toLowerCase());
                if (!movedUstensils.includes(currentUstensil)) {
                    ctx.ustensils.push(ustensil);
                }
            }
        });
    });
}