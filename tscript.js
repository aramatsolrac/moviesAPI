var moviesGenresURL = "https://api.themoviedb.org/3/genre/movie/list?api_key=2d0391dda9aa7c639004867f4b4bb58d";
var selectGenres = document.querySelector(".selectGenres");
var submitBtn = document.getElementById("button");
submitBtn.addEventListener("click", submitGenre);
function submitGenre(event) {
    event.preventDefault();
    var selectValue = selectGenres.value;
    findMovieByGenre(selectValue);
    selectGenres.value = "";
}
function findMovieByGenre(genre) {
    axios
        .get(moviesGenresURL)
        .then(function (response) {
        function displayGenresID(response) {
            var genresID = 0;
            var genresList = response.data;
            for (var i = 0; i < genresList.genres.length; i++) {
                if (genresList.genres[i].name === genre) {
                    genresID = genresList.genres[i].id;
                }
            }
            return genresID;
        }
        var genreID = displayGenresID(response);
        var moviesURL = "https://api.themoviedb.org/3/discover/movie?api_key=2d0391dda9aa7c639004867f4b4bb58d&with_genres=".concat(genreID);
        return axios.get(moviesURL);
    })
        .then(function (response) {
        var selectLanguage = document.querySelector(".selectLanguage");
        var selectLangValue = selectLanguage.value;
        selectLanguage.value = "";
        var movies = document.querySelector(".site-movies__list");
        movies.innerHTML = "";
        var moviesObj = response.data;
        var image = "https://www.themoviedb.org/t/p/w220_and_h330_face/";
        for (var i = 0; i < moviesObj.results.length; i++) {
            if (selectLangValue === moviesObj.results[i].original_language) {
                movies.innerHTML += "<li class=\"site-movies__item\">\n                        <div class=\"item-card\">\n                            <img class=\"item-card__img\" src=\"".concat(image).concat(moviesObj.results[i].backdrop_path, "\" alt=\"\">\n                            <p class=\"item-card__name\">").concat(moviesObj.results[i].original_title, "</p>\n                            <p class=\"item-date\">").concat(moviesObj.results[i].release_date, "</p>\n                            <button class=\"item-card__btn\">\n                            <i class=\"fas fa-star item-card__btn--like\" id=\"icon-like-").concat(i, "\" aria-hidden=\"true\"></i>\n                        </button>\n                        </div>\n                    </li>\n                    ");
            }
        }
        if (movies.innerHTML === "") {
            movies.innerHTML = "<div class=\"item-card__error-message\">\n                        <p>Sorry, we can't find anything in your search.</p>\n                    </div>\n                    ";
        }
        // const likeIcon = document.querySelectorAll(".item-card__btn--like") as HTMLElement;
        // likeIcon.forEach((icon) => {
        //   icon.addEventListener("click", (event: Event) => {
        //     event.target.classList.toggle("item-card__btn--liked");
        //   });
        // });
    })["catch"](function () {
        alert("Error trying to fetch the API.");
    });
}
