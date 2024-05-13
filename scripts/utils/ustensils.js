function extractUstensils(_recipes) {
    ctx.ustensils = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeUstensils = _recipes[i].ustensils;

        for (let j = 0; j < recipeUstensils.length; j++) {
            let found = false;
            const currentUstensil = recipeUstensils[j].toLowerCase();

            for (let k = 0; k < ctx.ustensils.length; k++) {
                if (currentUstensil === ctx.ustensils[k].toLowerCase()) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                // Vérifier également dans les ustensiles déplacés
                const movedUstensils = Array.from(document.querySelectorAll('#insistanteContentustensils .content')).map(item => item.textContent.trim().toLowerCase());
                if (!movedUstensils.includes(currentUstensil)) {
                    ctx.ustensils.push(recipeUstensils[j]);
                }
            }
        }
    }
}