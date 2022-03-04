import { getInfosForModal } from './modal.js';
import {urlTitle} from './main.js'

/**
 * Display the pictures and informations of 'the best movie' in the header.
 * @param {Array} movie Array from API with all infos for the best movie.
 */
export function displayBestMovie(movie) {
    let bestMovie = document.createElement("imgBestMovie")
    bestMovie.setAttribute('class', "imgBestMovie")
    bestMovie.style.backgroundImage ="url(" + movie.image_url + ")";
    document.querySelector("#containerBestMovie").append(bestMovie);
    bestMovie.style.height = bestMovie.offsetWidth * 1.472 + "px"
    document.querySelector("#title").textContent = movie.title
    getInfosForBestMovie(movie.id)
    let btnMoreInfo = document.querySelector("#moreInfo")
    let modalContainer = document.querySelector(".modalContainer");

    btnMoreInfo.onclick = function(){
        modalContainer.style.display = "block";
        modalContainer.style.zIndex = "+1";
        getInfosForModal(movie.id)
    }
    bestMovie.onclick = function(){
        modalContainer.style.display = "block";
        modalContainer.style.zIndex = "+1";
        getInfosForModal(movie.id)
    }
}
/**
 * Get with fetch the description from the best movie and display it.
 * @param {String} id Movie's id.
 */
async function getInfosForBestMovie(id){
    const requete = await fetch((urlTitle + "/" + id), {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        document.querySelector("#description").textContent = data.description 
    }
}









