// const moviesGenresURL =
//     "https://api.themoviedb.org/3/genre/movie/list?api_key=2d0391dda9aa7c639004867f4b4bb58d";

// const selectGenres = document.querySelector(".selectGenres");
// const submitBtn = document.getElementById("button");

// submitBtn.addEventListener("click", submitGenre);

// // processing the submitted event
// function submitGenre(event) {
//     event.preventDefault();
//     const selectValue = selectGenres.value;
//     findMovieByGenre(selectValue);
//     selectGenres.value = "";
// }

// // getting the genre ID and print the movies cards
// function findMovieByGenre(genre) {
//     axios
//         .get(moviesGenresURL)
//         .then((response) => {
//             function displayGenresID(response) {
//                 let genresID = 0;
//                 const genresList = response.data;
//                 for (let i = 0; i < genresList.genres.length; i++) {
//                     if (genresList.genres[i].name === genre) {
//                         genresID = genresList.genres[i].id;
//                     }
//                 }
//                 return genresID;
//             }
//             const genreID = displayGenresID(response);
//             const moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=2d0391dda9aa7c639004867f4b4bb58d&with_genres=${genreID}`;
//             return axios.get(moviesURL);
//         })
//         .then((response) => {
//             const selectLanguage = document.querySelector(".selectLanguage");
//             const selectLangValue = selectLanguage.value;
//             selectLanguage.value = ""
//             const movies = document.querySelector(".site-movies__list");
//             movies.innerHTML = "";
//             const moviesObj = response.data;
//             const image = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
//             for (let i = 0; i < moviesObj.results.length; i++) {
//                 if (selectLangValue === moviesObj.results[i].original_language) {
//                     movies.innerHTML +=
//                         `<li class="site-movies__item">
//                         <div class="item-card">
//                             <img class="item-card__img" src="${image}${moviesObj.results[i].backdrop_path}" alt="">
//                             <p class="item-card__name">${moviesObj.results[i].original_title}</p>
//                             <p class="item-date">${moviesObj.results[i].release_date}</p>
//                             <button class="item-card__btn">
//                             <i class="fas fa-star item-card__btn--like" id="icon-like-${i}" aria-hidden="true"></i>
//                         </button>
//                         </div>
//                     </li>
//                     `;
//                 }
//             }
//             if (movies.innerHTML === "") {
//                 movies.innerHTML =
//                     `<div class="item-card__error-message">
//                         <p>Sorry, we can't find anything in your search.</p>
//                     </div>
//                     `
//             }
//             const likeIcon = document.querySelectorAll(".item-card__btn--like");
//             likeIcon.forEach((icon) => {
//                 icon.addEventListener("click", (event) => {
//                     event.target.classList.toggle("item-card__btn--liked");
//                 });
//             })
//         })
//         .catch(() => {
//             alert("Error trying to fetch the API.")
//         });
// }
