let ustensils = [];

function extractUstensils(_recipes) {
    ustensils = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeUstensils = _recipes[i].ustensils;
        for (let j = 0; j < recipeUstensils.length; j++) {
            let found = false;
            for (let k = 0; k < ustensils.length; k++) {
                if (recipeUstensils[j].toLowerCase() == ustensils[k].toLowerCase()) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                ustensils.push(recipeUstensils[j]);
            }
        }
    }
}