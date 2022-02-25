
const nbrMoviesToDisplay = 7

const urlTitle = 'http://localhost:8000/api/v1/titles'
const urlGenre = 'http://localhost:8000/api/v1/genres'
const urlBestRanking = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=" + (nbrMoviesToDisplay + 1)
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay 
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay
const urlHistory = "http://localhost:8000/api/v1/titles/?genre=history&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay


function main() {
    displayMovieByCategory(urlAction, "films d' action", "actionMovies");
    displayMovieByCategory(urlComedy, "comedies", "comedyMovies");
    displayMovieByCategory(urlHistory, "films historique", "historyMovies");
    displayMovieByCategory(urlBestRanking, "Films les mieux notés", "bestMovies");  
    
}
main()
window.onresize = resizeHeightMovies



async function displayMovieByCategory(url, catégory, divName){
    const requete = await fetch(url, {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        data = data.results;
        if (url == urlBestRanking) {
            displayBestMovie(data[0]);
            createCaroussel(data.slice(1, (nbrMoviesToDisplay + 1)), catégory, divName)}
        else 
            createCaroussel(data, catégory, divName)
    }
}

function displayBestMovie(movie) {
    let bestMovie = createDiv("imgBestMovie")
    bestMovie.style.backgroundImage ="url(" + movie.image_url + ")";
    document.querySelector("#containerBestMovie").append(bestMovie);
    bestMovie.style.height = bestMovie.offsetWidth * 1.472 + "px"
    document.querySelector("#title").textContent = movie.title
    getInfosForBestMovie(movie.id)
    let btnMoreInfo = document.querySelector("#moreInfo")
    btnMoreInfo.onclick = function(){
        let modalContainer = document.querySelector(".modalContainer");
        modalContainer.style.display = "block";
        modalContainer.style.zIndex = "+1";
        getInfosForModal(movie.id)
    }
}

async function getInfosForBestMovie(id){
    const requete = await fetch((urlTitle + "/" + id), {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        document.querySelector("#description").textContent = data.description 
    }
}



function createCaroussel(movies, category, containerCarrousselId) {
    let containerCarrousel = createDiv(containerCarrousselId)
    document.querySelector("#allCarrousels").append(containerCarrousel)
    document.getElementById(containerCarrousselId).className="containerCarrousel";
    

    let titleCategorie = document.createElement('h1')
    titleCategorie.setAttribute('id', "tilteCategorie")
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
    leftButton.setAttribute('id', "goLeft")
    document.querySelector("#"+ containerCarrousselId).append(leftButton)
    let rightButton = document.createElement('button')
    rightButton.setAttribute('id', "goRight")
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

function createDiv(id) {
    let div = document.createElement('div');
    div.setAttribute('id', id);
    return div
}

function resizeHeightMovies() {
    let imgMovies = document.getElementsByClassName("divMovie")
    for (let imgMovie of imgMovies) {imgMovie.style.height = imgMovie.offsetWidth * 1.472 + "px"}

    let bestMovie = document.getElementById("imgBestMovie")
    bestMovie.style.height = bestMovie.offsetWidth * 1.472 + "px"
}





let closeModal = document.querySelector(".closeModal")
closeModal.onclick = function () {
    let modalContainer = document.querySelector(".modalContainer");
            modalContainer.style.display = "none";
            modalContainer.style.zIndex = "-1";

}


async function getInfosForModal(id){
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