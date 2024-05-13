function createTag(tagName, type) {
    const tags = document.querySelector('.tags');
    const tagsContent = document.createElement('article');
    tagsContent.classList.add('tagsContent');
    
    const tag = document.createElement('div');
    tag.classList.add('tagName');
    tag.textContent = tagName;
  
    const tagClose = document.createElement('img');
    tagClose.src = 'images/icons/tags_close.svg';
    tagClose.classList.add('tagClose');
    tagClose.alt = 'Fermer le tag';
  
    tags.appendChild(tagsContent);
    tagsContent.appendChild(tag);
    tagsContent.appendChild(tagClose);
  
    // Ajouter un gestionnaire d'événements pour supprimer le tag au clic sur l'icône de fermeture
    tagClose.addEventListener('click', function() {
        const insistanteContent = document.getElementById('insistanteContent' + type);
        const children = insistanteContent.children;
        let currentInsistanceElement = null;
        
        for (let i = 0; i < children.length; i++) {
            if (children[i].textContent === tagsContent.textContent) {
                currentInsistanceElement = children[i];
                break;
            }
        }

        if (currentInsistanceElement !== null) {
            insistanteContent.removeChild(currentInsistanceElement);
        }
    
        tagsContent.parentElement.removeChild(tagsContent);
        filterRecipes();
    });
}