
const urlBestMovie = 'http://localhost:8000/api/v1/titles/?actor=&actor_contains=&company=&company_contains=&country=&country_contains=&director=&director_contains=&genre=&genre_contains=&imdb_score=&imdb_score_max=&imdb_score_min=&lang=&lang_contains=&max_year=&min_year=&rating=&rating_contains=&sort_by=-imdb_score&title=&title_contains=&writer=&writer_contains=&year=';

const NbrPageByCategorie = 5


async function getBestMovie() {
    const requete = await fetch(urlBestMovie, {
        method: 'GET'
    });
    if (!requete.ok) {alert("Erreur de connexion")}
    else { let data = await requete.json();
        data = data.results[0]

        document.querySelector('#title').textContent = data.title;
        document.querySelector('#resume').textContent = "Super film";
        document.querySelector("#containerBestMovie").style.backgroundImage="url(" + data.image_url + ")";
    }
}




async function getBestMovies(url) {
    let urls = new Array(url)
    const requete = await fetch(url, {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { let data = await requete.json();
        let next = data.next
        urls.push(next)
        for (let i = 3; i < NbrPageByCategorie+1; i++ ){
            next = next.replace(i - 1, i)
            urls.push(next)    
        }
    urls.forEach(async function (url) {
        const requete = await fetch(url, {method: 'GET'});
        if (!requete.ok) {alert("Erreur de connexion")}
        else { let data = await requete.json();
            data = data.results
            for (let i = 0; i < 5; i++ ){ 
                let divMovie = document.createElement('div')
                divMovie.setAttribute('class', "divMovie")
                document.querySelector("#carrousel").append(divMovie)
                document.querySelector(".divMovie").className = "divMovie";
                // let img = document.createElement('img')
                // img.src=data[i].image_url;
                // img.title=data[i].title;
                // document.querySelector('.divMovie').append(img)
                // img.id="movie"
         }
         

        }
    });
    }
}

let containerCarrousel = document.createElement('div')
containerCarrousel.setAttribute('id', "containerCarrousel")
document.querySelector("#allCarrousels").append(containerCarrousel)

let titleCategorie = document.createElement('h1')
titleCategorie.setAttribute('id', "tilteCategorie")
titleCategorie.textContent = "Meilleur films"
document.querySelector("#containerCarrousel").append(titleCategorie)

let carrousel = document.createElement('div')
carrousel.setAttribute('id', "carrousel")
document.querySelector("#containerCarrousel").append(carrousel)

getBestMovie()
getBestMovies(urlBestMovie)





function goRight() {
    let translateX = -100 / 7
    document.querySelector("#carrousel").style.transform = "translate3D(-13.8%, 0, 0)"
}
function goLeft() {
    let translateX = -100 / 7
    document.querySelector("#carrousel").style.transform = "translate3D(0, 0, 0)"
}

let leftButton = document.createElement('button')
leftButton.setAttribute('id', "goLeft")
document.querySelector("#containerCarrousel").append(leftButton)

let rightButton = document.createElement('button')
rightButton.setAttribute('id', "goRight")
document.querySelector("#containerCarrousel").append(rightButton)



leftButton.onclick = () => {
    document.querySelector("#carrousel").style.transform = "translate3D(0, 0, 0)"
}
rightButton.onclick = () => {
    document.querySelector("#carrousel").style.transform = "translate3D(-13.8%, 0, 0)"
}

// rightButton.addEventListener('click', goRight)
// leftButton.addEventListener('click', goLeft)







