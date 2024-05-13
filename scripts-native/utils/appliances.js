function extractAppliances(_recipes) {
    ctx.appliances = [];

    for (let i = 0; i < _recipes.length; i++) {
        const recipeAppliances = _recipes[i].appliance;

        for (let j = 0; j < recipeAppliances.length; j++) {
            let found = false;
            const currentAppliance = recipeAppliances.toLowerCase();
            
            for (let j = 0; j < ctx.appliances.length; j++) {
                if (ctx.appliances[j].toLowerCase() === currentAppliance) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                const movedAppliances = document.getElementById(`insistanteContentappliances`).children;
                for(let k = 0; k < movedAppliances.length; k++) {
                    if (movedAppliances[k].textContent.toLowerCase() === currentAppliance) {
                        found = true;
                        break;
                    }
                }
            }

            if (!found) {
                ctx.appliances.push(currentAppliance);
            }
        }
    }
}