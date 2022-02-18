
const nbrMoviesToDisplay = 7

const urlTitle = 'http://localhost:8000/api/v1/titles'
const urlGenre = 'http://localhost:8000/api/v1/genres'
const urlBestRanking = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=" + (nbrMoviesToDisplay + 1)
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay 
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay
const urlAnimation = "http://localhost:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay





function main() {
    displayMovieByCategory(urlBestRanking);
    displayMovieByCategory(urlAction);
    displayMovieByCategory(urlComedy);
    displayMovieByCategory(urlAnimation);
    
}
main()
async function displayMovieByCategory(url){
    const requete = await fetch(url, {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        data = data.results;
        console.log(data);
        if (url == urlBestRanking) {
            displayBestMovie(data[0]);
            createCaroussel(data.slice(1, 8), "Meilleur films", 4, "bestMovie")}
        else if (url == urlAction){
            createCaroussel(data, "Films d' action", 4, "actionMovie")}
        else if (url == urlComedy){
            createCaroussel(data, "Comedies", 4, "comedyMovie")}
        else if (url == urlAnimation){
            createCaroussel(data, "Films d' animation", 4, "animationMovie")}
    }
}


function createDiv(id) {
    let div = document.createElement('div');
    div.setAttribute('id', id);
    return div
}

function displayBestMovie(movie) {
    let div = createDiv("imgBestMovie")
    div.style.backgroundImage ="url(" + movie.image_url + ")";
    document.querySelector("#containerBestMovie").append(div);
}

function createCaroussel(movies, category, visible, containerCarrousselId) {
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
        let imgMovie = createDiv("divMovie")
        imgMovie.style.backgroundImage ="url(" + movie.image_url + ")";
        document.querySelector("#carrousel__" + containerCarrousselId).append(imgMovie)
    })

    let startPosition = 0
    let leftButton = document.createElement('button')
    leftButton.setAttribute('id', "goLeft")
    document.querySelector("#carrousel__" + containerCarrousselId).append(leftButton)
    leftButton.onclick = function() {
        if (startPosition < 0) 
            startPosition++;
        carrousel.style.transform="translate(" + startPosition * 24 +"%)";
        console.log(startPosition)
        //hiddenButton()
    }

    let rightButton = document.createElement('button')
    rightButton.setAttribute('id', "goRight")
    document.querySelector("#carrousel__" + containerCarrousselId).append(rightButton)
    rightButton.onclick = function() {
        if (startPosition > -nbrMoviesToDisplay + visible) 
            startPosition-- 
        carrousel.style.transform="translate(" + startPosition * 24 +"%)"
        console.log(startPosition)
        //hiddenButton()
    }

    function hiddenButton() {
        if (startPosition == -nbrMoviesToDisplay + visible)
            rightButton.style.visibility = "hidden";
        else
            rightButton.style.visibility = "visible"; 
        if (startPosition == 0)
            leftButton.style.visibility = "hidden";
        else
            leftButton.style.visibility = "visible";
    }
}

