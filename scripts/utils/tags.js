function createIngredientTag(tagName) {
    const tags = document.querySelector('.tags')
    tags.style.display = 'flex';

    const tagsContent = document.createElement('article');
    tagsContent.classList.add('tagsContent');
    
    const tag = document.createElement('div');
    tag.classList.add('tagName');
    tag.textContent = tagName;

    const tagClose = document.createElement('img');
    tagClose.src = 'images/icons/tags_close.svg';
    tagClose.classList.add('tagClose');
    tagClose.alt = 'Fermer le tag';

    tags.appendChild(tagsContent)
    tagsContent.appendChild(tag);
    tagsContent.appendChild(tagClose);

    // Ajouter un gestionnaire d'événements pour supprimer le tag au clic sur l'icône de fermeture
    tagClose.addEventListener('click', closeTag);

    function closeTag() {
        const insistanteContent = document.getElementById('insistanteContentIngredient');
				const currentInsistanceElement = Array.from(insistanteContent.children).find(item => item.textContent === tagsContent.textContent);
        insistanteContent.removeChild(currentInsistanceElement);

				tagsContent.parentElement.removeChild(tagsContent);
				filterRecipes();
    }
}

function createApplianceTag(tagName) {
  const tags = document.querySelector('.tags')
  tags.style.display = 'flex';

  const tagsContent = document.createElement('article');
  tagsContent.classList.add('tagsContent');
  
  const tag = document.createElement('div');
  tag.classList.add('tagName');
  tag.textContent = tagName;

  const tagClose = document.createElement('img');
  tagClose.src = 'images/icons/tags_close.svg';
  tagClose.classList.add('tagClose');
  tagClose.alt = 'Fermer le tag';

  tags.appendChild(tagsContent)
  tagsContent.appendChild(tag);
  tagsContent.appendChild(tagClose);

  // Ajouter un gestionnaire d'événements pour supprimer le tag au clic sur l'icône de fermeture
  tagClose.addEventListener('click', closeTag);

  function closeTag() {
      const insistanteContent = document.getElementById('insistanteContentAppliance');
      const currentInsistanceElement = Array.from(insistanteContent.children).find(item => item.textContent === tagsContent.textContent);
      insistanteContent.removeChild(currentInsistanceElement);

      tagsContent.parentElement.removeChild(tagsContent);
      filterRecipes();
  }
}

function createUstensilTag(tagName) {
    const tags = document.querySelector('.tags')
    tags.style.display = 'flex';

    const tagsContent = document.createElement('article');
    tagsContent.classList.add('tagsContent');
    
    const tag = document.createElement('div');
    tag.classList.add('tagName');
    tag.textContent = tagName;

    const tagClose = document.createElement('img');
    tagClose.src = 'images/icons/tags_close.svg';
    tagClose.classList.add('tagClose');
    tagClose.alt = 'Fermer le tag';

    tags.appendChild(tagsContent)
    tagsContent.appendChild(tag);
    tagsContent.appendChild(tagClose);

    // Ajouter un gestionnaire d'événements pour supprimer le tag au clic sur l'icône de fermeture
    tagClose.addEventListener('click', closeTag);

    function closeTag() {
        const insistanteContent = document.getElementById('insistanteContentUstensil');
				const currentInsistanceElement = Array.from(insistanteContent.children).find(item => item.textContent === tagsContent.textContent);
        insistanteContent.removeChild(currentInsistanceElement);

				tagsContent.parentElement.removeChild(tagsContent);
				filterRecipes();
    }
}