
const apiKey = 'cffe392665ae8a8ef3affc40395301ef';
// ponele que pongo un onclick en el contenedor de todos los items de el nav, entonces los esta recorreindo
// y al hacer click en uno de ellos pasa por parametro la categoria y ahi redirige, porque sino tengo que poner un onclick por categoria y redirige ahi si pasando por parametro directamente el nombre.


// // const itemPopular = document.getElementById('items-nav-pop');

// // // cuando hace click en categorias y o view all debe ocultarse
// // ItemsNav.onclick = () => {
// //     hideBanner();
// // }

// -------------------------  OCULTAR HOME 
const homeContainer = document.getElementsByClassName('home-container'); //todo el home principal
const homeButton = document.getElementById('home-button'); //boton de ada de home
const specificCategoryPage = document.getElementById('specific-category');

const hideHomePrincipal = () => {  //oculta el home principal  
    homeContainer.classList.add('hide');    
}
// ------------------------ BOTON DE HOME

homeButton.onclick = () => {
    homeContainer.classList.remove('hide'); //le saca el ocultar a el home general
    showAllMoviesHome(); //llama a las cuatro categorias
    paginaActual = 1; //pagina actual vuelve a 1 para que cuando vuelva a llamarse empeze por esa
    specificCategoryPage.classList.add('hide'); //oculta la pagina de categoria que estaba   
}

//---------------------------HOME

const moviesContainer = document.getElementById('movies-container'); //este seria el contenedor de todas
const moviesModel = moviesContainer.children[0]; // este seria el que tiene el modelo

const ShowPrincipalMovies = categoria  => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${categoria}?api_key=${apiKey}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        console.log(data);
        moviesContainer.innerHTML = '';       
        for(let i = 0; i < 5; i++) { 
           const newMovies = moviesModel.cloneNode(true);
           newMovies.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
           newMovies.children[0].children[1].children[0].innerText = data.results[i].title;
           moviesContainer.appendChild(newMovies);           
        }
    });   
}

const showAllMoviesHome = () => {
    ShowPrincipalMovies('popular');
    ShowPrincipalMovies('top_rated');
    ShowPrincipalMovies('upcoming');
    ShowPrincipalMovies('now_playing');

}
showAllMoviesHome();

// const catPopular = () => { 
//     fetch 
//     (`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
//     .then(respuesta => respuesta.json() )
//     .then (data => {
//         console.log(data);
//         contenedorMovies.innerHTML = '';       
//         for(let i = 0; i < 5; i++) { 
//            const newMovies = moviesModel.cloneNode(true);
//            newMovies.children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
//            newMovies.children[1].innerText = data.results[i].title;
//            contenedorMovies.appendChild(newMovies);           
//         }
//     });   
// }


// // 2. el view all y la categoria redirigen a donde estan todas las peliculas de esa categoria y ahi muestra 20 
// // y siegue creciendo si  ponemos cargar mas ( osea carga de a 20 peliculas)

// // const ButtonViewAll = document.getElementById('button-view-all');

// let paginaActual = 1;

// // ButtonViewAll.onclick = () => {
// //     hideHomePrincipal();
// //     pagPopulares(paginaActual);
// // }

// const totalMovies = document.getElementById('total-of-movies'); // este es el id de donde tiene el numero de resultados totales

// const viewSpecificCategory = category => { //aca paso por parametro que categoria es para que la muestre
//     fetch 
//     (`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${paginaActual}`)
//     .then(respuesta => respuesta.json() )
//     .then (data => {
//         console.log(data);
//         contenedorMovies.innerHTML = ''; 
//         totalMovies.innerText = data.results.total_results;
//         for(result of data.results) { 
//            const newMovies = moviesModel.cloneNode(true);
//            newMovies.children[0].src = `https://image.tmdb.org/t/p/w500${data.result.poster_path}`;
//            newMovies.children[1].innerText = data.result.title;
            //   newMovies.onclick = () => {
            //         movieDetail(result.id);
            //         closePopUp.classList.remove('hide-popup');
            //     }
            //   contenedorMovies.appendChild(newMovies);           
//         }
//     });   
// }
// viewSpecificCategory("popular"); //por ejemplo

// // const ButtonLoadMore = document.getElementById('button-load-more');

// // ButtonLoadMore.onclick = () => {
// //     pagPopulares(paginaActual++);
// // }

// //4. cuando buscamos en el buscador el valor que devulve es la palabra clave y es igual devuleve 20 tambien

const inputSearch = document.getElementById("input-search"); //id de input

 inputSearch.onkeypress = event => {
     if (event.keycode === 13) {
             searchByKeyWord(inputSearch.value);
        //llama al a funcion de palabra clave con el valor del (inputSearch.value)
    } 
}

// //en vez de pasar paginaactual poener search.value
// const searchByKeyWord = textoBusqueda => { 
//     fetch 
//     (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${paginaActual}`)
//     .then(respuesta => respuesta.json() )
//     .then (data => {
//         console.log(data);
//         contenedorMovies.innerHTML = ''; 
//         totalPages.innerText = data.results.total_results;
//         for(result of data.results) { 
//            const newMovies = moviesModel.cloneNode(true);
//            newMovies.children[0].src = `https://image.tmdb.org/t/p/w500${data.result.poster_path}`;
//            newMovies.children[1].innerText = data.result.title;
//            contenedorMovies.appendChild(newMovies);           
//         }
//     });   
// }



//Para pedirle la información a la API, vamos a utilizar las siguientes URLs:

// // si hicimos click en la categoria Popular, las peliculas a mostrar la sacamos de:
// `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${paginaActual}`

// // si hicimos click en la categoria Top Rated, las peliculas a mostrar la sacamos de:
// `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${paginaActual}`

// // si hicimos click en la categoria Upcoming, las peliculas a mostrar la sacamos de:
// `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=${paginaActual}`

// // si hicimos click en la categoria Now Playing, las peliculas a mostrar la sacamos de:
// `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${paginaActual}`

// // si hicimos una búsqueda por palabra clave, las peliculas a mostrar la sacamos de:
// `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${paginaActual}`




// Al api nos responde con un objeto que tiene que página le pedimos, la cantidad de resultados total de la búsqueda, la cantidad de páginas que tenemos (clave para saber cuando dejar de mostrar el botón LOAD MORE) y un array en la propiedad results con todas las películas de la página:


// -------------------------  POPUP
//onclick al contenedor de la pelicula para que muestre el modal que es el que llama a esta funcion

const background = document.getElementById('background-img-popup');
const poster = document.getElementById('popup-movie-poster');
const title = document.getElementById('movie-title-text');
const tagline = document.getElementById('movie-tagline-text');
const overview = document.getElementById('overview');
const genres = document.getElementById('genres');
const releaseDate = document.getElementById('release-date');
const closePopUp = document.getElementById('movie-popup-close');
// const search = document.getElementById('search');

const movieDetail = peliculaId => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${peliculaId}?api_key=${apiKey}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        console.log(data);  
        let date = new Date(data.release_date);
        let options = {year: 'numeric', month: 'long', day: 'numeric' };
        let imgBack = `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
        background.style.backgroundImage = `url(${imgBack})`;
        poster.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
        title.innerText = data.title;
        tagline.innerText = data.tagline;
        overview.innerText = data.overview;
        genres.innerText = data.genres.map(genre => genre.name).join(', ');
        releaseDate.innerText = date.toLocaleDateString('en-GB', options);
    });   
}

movieDetail('299534')

closePopUp.onclick = () => {
    closePopUp.classList.add('hide-popup'); // aca le pongo le estoy agregando la classs que tiene display: none
    //aca deja de tener el overflow hidden en el body 
}




