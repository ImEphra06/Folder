function createTag(tagName) {
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

    function closeTag () {
        tagsContent.style.display = "none";
    }
}

// Création d'une fonction closeTag puis l'ajouter à l'évènement click de moveInsistanteToIngredient