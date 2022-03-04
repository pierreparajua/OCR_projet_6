
import {displayBestMovie} from './bestMovie.js'
import {createCarrousel} from './carrousel.js'
import {resizeHeightMovies} from './carrousel.js';


export const nbrMoviesToDisplay = 7

export const urlTitle = "http://localhost:8000/api/v1/titles"
const urlBestRanking = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=" + (nbrMoviesToDisplay + 1)
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay 
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay
const urlHistory = "http://localhost:8000/api/v1/titles/?genre=history&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay


/**
 * Get infos with fetch regardind the url address.
 * @param {String} url Url's address for the fetch request.
 * @returns An promisse with the informations.
 */
async function getData(url){
    const requete = await fetch(url, {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        return data.results;
    }
}


let bestMovies = await getData(urlBestRanking)
displayBestMovie(bestMovies[0])
createCarrousel(bestMovies, "Films les mieux notés", "bestMovies")

let historyMovies = await getData(urlHistory)
let actionMovies = await getData(urlAction)
let comedyMovies = await getData(urlComedy)

createCarrousel(historyMovies, "Films historique", "historyvies")
createCarrousel(actionMovies, "Films d' action", "actionMovies")
createCarrousel(comedyMovies, "Films comique", "comedyMovies")
window.onresize = resizeHeightMovies


