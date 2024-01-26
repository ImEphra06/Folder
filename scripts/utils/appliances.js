let appliances = [];

function extractAppliances(_recipes) {
    appliances = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeAppliance = _recipes[i].appliance;
        if (recipeAppliance) {
            let found = false;
            const currentAppliance = recipeAppliance.toLowerCase();
            for (let j = 0; j < appliances.length; j++) {
                if (appliances[j].toLowerCase() === currentAppliance) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                appliances.push(recipeAppliance);
            }
        }
    }
}

console.log(appliances);