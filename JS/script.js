
const apiKey = 'cffe392665ae8a8ef3affc40395301ef';

const moviesContainer = document.getElementById('movies-container'); 
const moviesModel = moviesContainer.children[0]; 

const homeContainer = document.getElementById('home-container'); 
const homeButton = document.getElementById('home-button'); 
const specificCategoryPage = document.getElementById('specific-category');
const buttonViewAllPopular = document.getElementById('button-view-all-popular');
const buttonViewAllTopRated = document.getElementById('button-view-all-toprated');
const buttonViewAllUpcoming = document.getElementById('button-view-all-upcoming');
const buttonViewAllNowPlaying = document.getElementById('button-view-all-nowplaying');

let currentPage = 1;

const popularMovieContainer = document.getElementById('movies-container-popular');
const topRatedMovieContainer = document.getElementById('movies-container-toprated');
const upcomingMovieContainer = document.getElementById('movies-container-upcoming');
const nowPlayingdMovieContainer = document.getElementById('movies-container-nowplaying');

const buttonLoadMore = document.getElementById('button-load-more');
const inputSearch = document.getElementById("input-search"); //id de input

const titleSpecificCategory = document.getElementById('title-specific-category');
const totalMovies = document.getElementById('total-of-movies'); 

const navPopular = document.getElementById('popular-icon');
const navTopRated = document.getElementById('toprated-icon');
const navUpcoming = document.getElementById('upcoming-icon');
const navNowPlaying = document.getElementById('nowplaying-icon');

const background = document.getElementById('background-img-popup');
const poster = document.getElementById('popup-movie-poster');
const title = document.getElementById('movie-title-text');
const tagline = document.getElementById('movie-tagline-text');
const overview = document.getElementById('overview');
const genres = document.getElementById('genres');
const releaseDate = document.getElementById('release-date');
const closePopUp = document.getElementById('movie-popup-close');
const popUp = document.getElementById('movie-popup');

// ponele que pongo un onclick en el contenedor de todos los items de el nav, entonces los esta recorreindo
// y al hacer click en uno de ellos pasa por parametro la categoria y ahi redirige, porque sino tengo que poner un onclick por categoria y redirige ahi si pasando por parametro directamente el nombre.

const ShowPrincipalMovies = (container, category)  => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        container.innerHTML = '';       
        for(let i = 0; i < 5; i++) { 
           const newMovies = moviesModel.cloneNode(true);
           newMovies.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${data.results[i].poster_path}`;
           newMovies.children[0].children[1].children[0].innerText = data.results[i].title;
           newMovies.onclick = () => {
            movieDetail(data.results[i].id);
            popUp.style.display = 'block';
        }
           container.appendChild(newMovies);           
        }
    });   
}

const showAllMoviesHome = () => { 
    ShowPrincipalMovies(popularMovieContainer, 'popular');
    ShowPrincipalMovies(topRatedMovieContainer, 'top_rated');
    ShowPrincipalMovies(upcomingMovieContainer, 'upcoming');
    ShowPrincipalMovies(nowPlayingdMovieContainer, 'now_playing');
}

showAllMoviesHome();


const viewSpecificCategory = (category, categoryName) => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&page=${currentPage}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        moviesContainer.innerHTML = ''; 
        titleSpecificCategory.innerText = categoryName;
        totalMovies.innerText = `${(data.total_results).toLocaleString()} results`;
        for(result of data.results) { 
            const newMovies = moviesModel.cloneNode(true);
            newMovies.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
            newMovies.children[0].children[1].children[0].innerText = result.title;
            newMovies.onclick = () => {
                movieDetail(result.id);
                closePopUp.classList.remove('hide-popup');
            }
            moviesContainer.appendChild(newMovies);           
        }
    });   
}
//en vez de pasar currentPage poener search.value
const searchByKeyWord = textoBusqueda => { 
    fetch 
    (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${currentPage}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        console.log(data);
        moviesContainer.innerHTML = ''; 
        titleSpecificCategory.innerText = 'Search Results'; //aca falta cambiar esto
        totalMovies.innerText = `${(data.total_results).toLocaleString()} results`;
        for(result of data.results) { 
           const newMovies = moviesModel.cloneNode(true);
           newMovies.children[0].children[0].children[0].src = `https://image.tmdb.org/t/p/w500${result.poster_path}`;
           newMovies.children[0].children[1].children[0].innerText = result.title;
           moviesContainer.appendChild(newMovies);           
        }
    });   
};

const movieDetail = movieId => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
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
        genres.innerText = data.genres.map(genre => genre.name).join(',  ');
        releaseDate.innerText = date.toLocaleDateString('en-GB', options);
    });   
}

const hideHomePrincipal = () => {  
    homeContainer.classList.add('hide');    
}

homeButton.onclick = () => {
    homeContainer.classList.remove('hide'); 
    showAllMoviesHome(); 
    currentPage = 1; 
    specificCategoryPage.classList.add('hide'); 
}

navPopular.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('popular', 'Popular');   
}
navTopRated.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('top_rated', 'Top Rated');  
}
navUpcoming.onclick = () => {
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('upcoming', 'Upcoming'); 
}
navNowPlaying.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('now_playing', 'Now Playing'); 
}

buttonViewAllPopular.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('popular', 'Popular');  
}

buttonViewAllTopRated.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('top_rated', 'Top Rated'); 
}

buttonViewAllUpcoming.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('upcoming', 'Upcoming'); 
}

buttonViewAllNowPlaying.onclick = () => { 
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('now_playing', 'Now Playing'); 
}

buttonLoadMore.onclick = () => {
    currentPage++;
}

inputSearch.onkeypress = event => {
     if (event.keycode === 13) {
        specificCategoryPage.classList.remove('hide');
        hideHomePrincipal();
        searchByKeyWord(inputSearch.value);
    } 
}

closePopUp.onclick = () => {
    popUp.style.display = 'none'; 
   
}


// Al api nos responde con un objeto que tiene que página le pedimos, la cantidad de resultados total de la búsqueda, la cantidad de páginas que tenemos (clave para saber cuando dejar de mostrar el botón LOAD MORE) y un array en la propiedad results con todas las películas de la página:










