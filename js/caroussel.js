import {nbrMoviesToDisplay} from "./main.js";
import { getInfosForModal } from "./modal.js";

/**
 * Create a caroussel.
 * @param {Array} movies Array with all movies to display in the caroussel.
 * @param {String} category Name of the  caroussel's category.
 * @param {String} containerCarrousselId Name of the id for the section
 */
export function createCaroussel(movies, category, containerCarrousselId) {
    let containerCarrousel = document.createElement('section')
    containerCarrousel.setAttribute('id', containerCarrousselId)
    document.querySelector("#allCarrousels").append(containerCarrousel)
    document.getElementById(containerCarrousselId).className="containerCarrousel";
    

    let titleCategorie = document.createElement('h1')
    titleCategorie.setAttribute('class', "tilteCategorie")
    titleCategorie.textContent = category
    document.querySelector("#"+ containerCarrousselId).append(titleCategorie)
    

    let carrousel = createDiv("carrousel__" + containerCarrousselId);
    document.querySelector("#" +containerCarrousselId).append(carrousel);
    document.getElementById("carrousel__" + containerCarrousselId).className="carrousel";

    movies.forEach(movie => {
        let imgMovie = document.createElement('div');
        imgMovie.setAttribute('class', "divMovie");
        imgMovie.style.backgroundImage ="url(" + movie.image_url + ")";
        document.querySelector("#carrousel__" + containerCarrousselId).append(imgMovie);
        imgMovie.style.height = imgMovie.offsetWidth * 1.472 + "px";
        imgMovie.onclick = function(){
            let modalContainer = document.querySelector(".modalContainer");
            modalContainer.style.display = "block";
            modalContainer.style.zIndex = "+1";
            getInfosForModal(movie.id)
        }
    })

    let startPosition = 0

    let leftButton = document.createElement('button')
    leftButton.setAttribute('class', "goLeft")
    document.querySelector("#"+ containerCarrousselId).append(leftButton)
    let rightButton = document.createElement('button')
    rightButton.setAttribute('class', "goRight")
    document.querySelector("#"+ containerCarrousselId).append(rightButton)
    hiddenButton()



    leftButton.onclick = function() {
        if (startPosition < 0) 
            startPosition++;
        carrousel.style.transform="translate(" + startPosition * 24 +"%)";
        hiddenButton()}

    rightButton.onclick = function() {
        if (startPosition > -nbrMoviesToDisplay + 4) 
            startPosition-- 
        carrousel.style.transform="translate(" + startPosition * 24 +"%)"
        hiddenButton()}

    function hiddenButton() {
        if (startPosition == -nbrMoviesToDisplay + 4)
            rightButton.style.visibility = "hidden";
        else
            rightButton.style.visibility = "visible"; 

        if (startPosition == 0)
            leftButton.style.visibility = "hidden";
        else
            leftButton.style.visibility = "visible";
    }
    
}

export function createDiv(id) {
    let div = document.createElement('div');
    div.setAttribute('id', id);
    return div
}


export function resizeHeightMovies() {
    let imgMovies = document.getElementsByClassName("divMovie")
    for (let imgMovie of imgMovies) {imgMovie.style.height = imgMovie.offsetWidth * 1.472 + "px"}

    let bestMovie = document.querySelector(".imgBestMovie")
    bestMovie.style.height = bestMovie.offsetWidth * 1.472 + "px"
}
