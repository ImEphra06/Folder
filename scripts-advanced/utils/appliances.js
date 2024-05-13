function extractAppliances(_recipes) {
    ctx.appliances = [];

    _recipes.forEach(recipe => {
        const recipeAppliances = Array.isArray(recipe.appliance) ? recipe.appliance.map(a => a.toLowerCase()) : [recipe.appliance.toLowerCase()];

        recipeAppliances.forEach(appliance => {
            const currentAppliance = appliance.toLowerCase();
            const isDuplicate = ctx.appliances.some(ap => ap.toLowerCase() === currentAppliance);

            if (!isDuplicate) {
                const movedAppliances = Array.from(document.querySelectorAll('#insistanteContentappliances .content')).map(item => item.textContent.trim().toLowerCase());
                if (!movedAppliances.includes(currentAppliance)) {
                    ctx.appliances.push(appliance);
                }
            }
        });
    });
}