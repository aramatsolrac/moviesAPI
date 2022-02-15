const moviesGenresURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=2d0391dda9aa7c639004867f4b4bb58d";

const selectGenres = document.querySelector(".selectGenres");
const selectValue = selectGenres.value;
const submitBtn = document.getElementById("button");


submitBtn.addEventListener("click", submitGenre);

let selectedGenre = '';

function submitGenre(event) {
    event.preventDefault();
    const selectValue = selectGenres.value;
    console.log(selectGenres.value)
    findMovieByGenre(selectValue);
    selectGenres.value = "";
}

function findMovieByGenre(genre) {
    axios.get(moviesGenresURL).then((response) => {
        function displayGenresID(response) {
            let genresID = 0;
            const genresList = response.data;
            console.log({ selectedGenre })
            for (let i = 0; i < genresList.genres.length; i++) {
                if (genresList.genres[i].name === genre) {
                    genresID = genresList.genres[i].id;
                }
            }
            return genresID;
        }
        const genreID = displayGenresID(response);
        // console.log({ genreID });
        const moviesURL = `https://api.themoviedb.org/3/discover/movie?api_key=2d0391dda9aa7c639004867f4b4bb58d&with_genres=${genreID}`;
        return axios.get(moviesURL)
    }).then((response) => {
        const movies = document.querySelector(".movies");
        movies.innerHTML = "";
        const moviesObj = response.data;
        const image = "https://www.themoviedb.org/t/p/w220_and_h330_face/"
        for (let i = 0; i < moviesObj.results.length; i++) {
            movies.innerHTML +=
                `<li>
                    <div class="moviesList">
                        <img src="${image}${moviesObj.results[i].backdrop_path}" alt="">
                        <p>${moviesObj.results[i].original_title}</p>
                        <p>${moviesObj.results[i].release_date}</p>
                    </div>
                </li>
            `
        }
    })
}