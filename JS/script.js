
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
const inputSearch = document.getElementById("input-search"); 
const movieNotFound = document.getElementById("movie-not-found");

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

// ====================================== FUNCIONES =======================================//

const searchMovieImage = ruta => {
    if (ruta !== null) {
       return `https://image.tmdb.org/t/p/w500${ruta}`;
    } else {
       return 'img/no-image.png';
    }
}

const hideHomePrincipal = () => {  
    homeContainer.classList.add('hide');    
}

const ShowPrincipalMovies = (container, category)  => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        container.innerHTML = '';       
        for(let i = 0; i < 5; i++) { 
           const newMovies = moviesModel.cloneNode(true);
           newMovies.children[0].children[0].children[0].src = searchMovieImage(data.results[i].poster_path);
           newMovies.children[0].children[1].children[0].innerText = data.results[i].title;
           newMovies.onclick = () => {
                movieDetail(data.results[i].id);
                popUp.style.display = 'flex';
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
        titleSpecificCategory.innerText = categoryName;
        totalMovies.innerText = `${(data.total_results).toLocaleString()} results`;
        if (data.total_results.length < 20) {buttonLoadMore.style.display = "none"};
        for(let i = 0; i < data.results.length; i++) { 
            const newMovies = moviesModel.cloneNode(true);
            newMovies.children[0].children[0].children[0].src = searchMovieImage(data.results[i].poster_path);
            newMovies.children[0].children[1].children[0].innerText = data.results[i].title;
            newMovies.onclick = () => {
                movieDetail(data.results[i].id);
                popUp.style.display = 'flex';
            }
            buttonLoadMore.onclick = () => {
                currentPage++;
                // specificCategoryPage.classList.remove('hide');
                viewSpecificCategory(category, categoryName);
            }
            moviesContainer.appendChild(newMovies);           
        }
    });   
}

const searchByKeyWord = textoBusqueda => { 
    fetch 
    (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${textoBusqueda}&page=${currentPage}`)
    .then(respuesta => respuesta.json() )
    .then (data => {
        if (data.total_results !== 0) {
            titleSpecificCategory.innerText = 'Search Results'; 
            totalMovies.innerText = `${(data.total_results).toLocaleString()} results`;
            if (data.total_results.length < 20) {buttonLoadMore.style.display = "none"};
            for(let i = 0; i < data.results.length; i++) { 
               const newMovies = moviesModel.cloneNode(true);
               newMovies.children[0].children[0].children[0].src = searchMovieImage(data.results[i].poster_path);
               newMovies.children[0].children[1].children[0].innerText = data.results[i].title;
               newMovies.onclick = () => {
                movieDetail(data.results[i].id);
                popUp.style.display = 'flex';
                }              
                buttonLoadMore.onclick = () => {     
                    currentPage++;
                    searchByKeyWord(textoBusqueda);
                }
               moviesContainer.appendChild(newMovies);           
            }

        } else {
            hideHomePrincipal();
            specificCategoryPage.classList.add('hide'); 
            movieNotFound.style.display = "flex";
        }
        if (data.total_results.length < 20) {buttonLoadMore.style.display = "none"};

    });   
};

const movieDetail = movieId => { 
    fetch 
    (`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then(respuesta => respuesta.json() )
    .then (data => { 
        let date = new Date(data.release_date);
        let options = {year: 'numeric', month: 'long', day: 'numeric' };
        let imgBack = searchMovieImage(data.backdrop_path);
        background.style.backgroundImage = `url(${imgBack})`;
        poster.src = searchMovieImage(data.poster_path);
        title.innerText = data.title;
        tagline.innerText = data.tagline;
        overview.innerText = data.overview;
        genres.innerText = data.genres.map(genre => genre.name).join(',  ');
        releaseDate.innerText = date.toLocaleDateString('en-GB', options);
    });   
}

homeButton.onclick = () => {
    moviesContainer.innerHTML = '';
    homeContainer.classList.remove('hide'); 
    showAllMoviesHome(); 
    currentPage = 1; 
    specificCategoryPage.classList.add('hide'); 
}

navPopular.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('popular', 'Popular');   
}
navTopRated.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('top_rated', 'Top Rated');  
}
navUpcoming.onclick = () => {
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('upcoming', 'Upcoming'); 
}
navNowPlaying.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('now_playing', 'Now Playing'); 
}

buttonViewAllPopular.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('popular', 'Popular');  
}
buttonViewAllTopRated.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('top_rated', 'Top Rated'); 
}
buttonViewAllUpcoming.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('upcoming', 'Upcoming'); 
}
buttonViewAllNowPlaying.onclick = () => { 
    moviesContainer.innerHTML = '';
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    viewSpecificCategory('now_playing', 'Now Playing'); 
}

inputSearch.onchange = () => {
    moviesContainer.innerHTML = ''; 
    movieNotFound.style.display = "none";
    specificCategoryPage.classList.remove('hide');
    hideHomePrincipal();
    searchByKeyWord(inputSearch.value);   
}

closePopUp.onclick = () => {
    popUp.style.display = 'none';   
}









