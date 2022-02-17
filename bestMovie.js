
const nbrMoviesToDisplay = 7

const urlTitle = 'http://localhost:8000/api/v1/titles'
const urlGenre = 'http://localhost:8000/api/v1/genres'
const urlBestRanking = "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=" + (nbrMoviesToDisplay + 1)
const urlAction = "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score&page_size=" + nbrMoviesToDisplay 
const urlComedy = "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score&page_size=7" + nbrMoviesToDisplay
const urlAnimation = "http://localhost:8000/api/v1/titles/?genre=animation&sort_by=-imdb_score&page_size=7" + nbrMoviesToDisplay





async function getData(){
    const requete = await fetch(urlBestRanking, {method: 'GET'});
    if (!requete.ok) {alert("Erreur de connexion")}
    else { 
        let data =   await requete.json();
        data = data.results;
        console.log(data);
        getBestMovie(data[0]);
        createCaroussel(data, "Meilleur films", 4)
    }
}
getData();

function createDiv(id) {
    let div = document.createElement('div');
    div.setAttribute('id', id);
    return div
}

function getBestMovie(movie) {
    let div = createDiv("imgBestMovie")
    div.style.backgroundImage ="url(" + movie.image_url + ")";
    document.querySelector("#containerBestMovie").append(div);
}

function createCaroussel(movies, category, visible) {
    let containerCarrousel = createDiv('containerCarrousel')
    document.querySelector("#allCarrousels").append(containerCarrousel)

    let titleCategorie = document.createElement('h1')
    titleCategorie.setAttribute('id', "tilteCategorie")
    titleCategorie.textContent = category
    document.querySelector("#containerCarrousel").append(titleCategorie)

    let carrousel = createDiv("carrousel")
    document.querySelector("#containerCarrousel").append(carrousel)

    movies.slice(1, 8).forEach(movie => {
        let imgMovie = createDiv("divMovie")
        imgMovie.style.backgroundImage ="url(" + movie.image_url + ")";
        document.querySelector("#carrousel").append(imgMovie)
    })

    let leftButton = document.createElement('button')
    leftButton.setAttribute('id', "goLeft")
    document.querySelector("#containerCarrousel").append(leftButton)

    let rightButton = document.createElement('button')
    rightButton.setAttribute('id', "goRight")
    document.querySelector("#containerCarrousel").append(rightButton)
    
    leftButton.onclick = () => {
        document.querySelector("#carrousel").style.transform = "translate3D(0, 0, 0)"}
    rightButton.onclick = () => {
        document.querySelector("#carrousel").style.transform = "translate3D(-24%, 0, 0)"}
}



// async function getBestMovies(url) {
//     const urls = new Array(url)
//     const requete = await fetch(url, {method: 'GET'});
//     if (!requete.ok) {alert("Erreur de connexion")}
//     else { let data = await requete.json();
//         let next = data.next
//         urls.push(next)
//         for (let i = 3; i < NbrPageByCategorie+1; i++ ){
//             next = next.replace(i - 1, i)
//             urls.push(next)    
//         }
//     }    
//     const datasUrls = new Array()
//     const datasTitle = new Array()
//     urls.forEach(async function (url) {
//         const requete = await fetch(url, {method: 'GET'});
//         if (!requete.ok) {alert("Erreur de connexion")}
//         else { let data = await requete.json();
//             data = data.results
//             for (let i = 0; i < 5; i++ ){
//                 datasUrls.push(data[i].image_url)
//                 datasTitle.push(data[i].title)      
//          }
//         }
//     });
//     let datas = [[datasUrls], [datasTitle]]
//     return datas
// }


// let containerCarrousel = document.createElement('div')
// containerCarrousel.setAttribute('id', "containerCarrousel")
// document.querySelector("#allCarrousels").append(containerCarrousel)

// let titleCategorie = document.createElement('h1')
// titleCategorie.setAttribute('id', "tilteCategorie")
// titleCategorie.textContent = "Meilleur films"
// document.querySelector("#containerCarrousel").append(titleCategorie)

// let carrousel = document.createElement('div')
// carrousel.setAttribute('id', "carrousel")
// document.querySelector("#containerCarrousel").append(carrousel)

// getBestMovie()
// const datas = getBestMovies(urlBestMovie)
// console.log(datas)
// for (let i = 0; i < (NbrPageByCategorie*5); i++){
//     console.log(datas[0][i])
//     //let divMovie = document.createElement('div')
//     divMovie.setAttribute('class', "divMovie")
//     //divMovie.style.backgroundImage ="url('" + datas[0][i] +"')";
//     document.querySelector("#carrousel").append(divMovie);
// } 


//     // let divMovie = document.createElement('div')
//     // divMovie.setAttribute('class', "divMovie")
//     // divMovie.style.backgroundImage = ""+ datas[index].image_url +"";
//     // document.querySelector("#carrousel").append(divMovie);
    




// function goRight() {
//     let translateX = -100 / 7
//     document.querySelector("#carrousel").style.transform = "translate3D(-13.8%, 0, 0)"
// }
// function goLeft() {
//     let translateX = -100 / 7
//     document.querySelector("#carrousel").style.transform = "translate3D(0, 0, 0)"
// }

// let leftButton = document.createElement('button')
// leftButton.setAttribute('id', "goLeft")
// document.querySelector("#containerCarrousel").append(leftButton)

// let rightButton = document.createElement('button')
// rightButton.setAttribute('id', "goRight")
// document.querySelector("#containerCarrousel").append(rightButton)



// leftButton.onclick = () => {
//     document.querySelector("#carrousel").style.transform = "translate3D(0, 0, 0)"
// }
// rightButton.onclick = () => {
//     document.querySelector("#carrousel").style.transform = "translate3D(-13.8%, 0, 0)"
// }

// rightButton.addEventListener('click', goRight)
// leftButton.addEventListener('click', goLeft)

// let divMovie = document.createElement('div')
// divMovie.setAttribute('class', "divMovie")
// divMovie.style.backgroundImage = ""+ data[i].image_url +"";
// document.querySelector("#carrousel").append(divMovie)
//                 document.querySelector(".divMovie").className = "divMovie";
//                 let img = document.createElement('img')
//                 img.src=data[i].image_url;
//                 img.title=data[i].title;
//                 document.querySelector('.divMovie').append(img)
//                 img.id="movie"





