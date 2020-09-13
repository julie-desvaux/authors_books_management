const confirmDeleteAuthor = () => {
    return confirm('Voulez-vous vraiment supprimer cet auteur ?')
}

const confirmDeleteBook = () => {
    return confirm('Voulez-vous vraiment supprimer ce livre ?')
}

const displayForm = () => {
    const addForm = document.querySelector("#addForm");
    addForm.classList.remove("d-none");
}