
import {displayBestMovie} from './bestMovie.js'
import {createCaroussel} from './caroussel.js'
import {resizeHeightMovies} from './caroussel.js';


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
let historyMovies = await getData(urlHistory)
let actionMovies = await getData(urlAction)
let comedyMovies = await getData(urlComedy)

displayBestMovie(bestMovies[0])

createCaroussel(bestMovies, "Films les mieux notés", "bestMovies")
createCaroussel(historyMovies, "Films historique", "historyvies")
createCaroussel(actionMovies, "Films d' action", "actionMovies")
createCaroussel(comedyMovies, "Films comique", "comedyMovies")
window.onresize = resizeHeightMovies


