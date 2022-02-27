import {urlTitle} from "./main.js";
/**
 * Get and display  all infos about a movie inside modal window
 * @param {String} id Movie's id.
 */
export async function getInfosForModal(id){
    const requete = await fetch((urlTitle + "/" + id), {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        document.querySelector(".mainTitle").textContent =data.original_title
        document.querySelector(".title").textContent = "Titre: "+  data.title
        document.querySelector(".genres").textContent = "Genre: " + data.genres
        document.querySelector(".date").textContent = "Date de sorie: " + data.date_published
        document.querySelector(".rated").textContent = "Rated: " + data.votes
        document.querySelector(".imdb").textContent = "Score Imdb: " + data.imdb_score
        document.querySelector(".director").textContent = "Réalisateur: " + data.directors 
        document.querySelector(".actors").textContent = "Liste des acteurs: " + data.actors
        document.querySelector(".duration").textContent = "Durée: " + data.duration
        document.querySelector(".countries").textContent = "Pays d’origine: " + data.countries
        document.querySelector(".boxOffice").textContent = "résultat au Box Office: " + data.budget
        document.querySelector(".longDescription").textContent = "résumé du film: " + data.long_description
    }
}

/*Close the modal window*/
let closeModal = document.querySelector(".closeModal")
closeModal.onclick = function () {
    let modalContainer = document.querySelector(".modalContainer");
            modalContainer.style.display = "none";
            modalContainer.style.zIndex = "-1";

}