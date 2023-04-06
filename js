

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("search-input").value;
    searchMovies(searchTerm);
  });
});

function searchMovies(searchTerm) {
  const url = `https://movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&apikey=199a7b82edmsh36540c704d6f982p1`;
  const url2 = `https://movie-database-alternative.p.rapidapi.com/?s=${searchTerm}&r=json&page=1`;

  fetch(url2, {
    headers: {
      "X-RapidAPI-Key": "199a7b82edmsh36540c704d6f982p130964jsne3d245b63a62",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.Response === "True") {
        displayMovies(data.Search);
      } else {
        displayError();
      }
    })
    .catch((error) => console.log(error));
}

function displayMovies(movies) {
  const results = document.getElementById("results");
  const likeButtons = document.querySelector("#like-button");

  results.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button id="like-button">like</button>
         <p id="like-count">$0</p>
        <button class="details-button" data-id="${movie.imdbID}">Details</button>
      `;

    results.appendChild(movieCard);
  });

  const detailsButtons = document.querySelectorAll(".details-button");
  detailsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const imdbID = this.dataset.id;
      getMovieDetails(imdbID);
    });
  });
}

function getMovieDetails(imdbID) {
  const url = `https://movie-database-alternative.p.rapidapi.com/?i=${imdbID}&apikey=199a7b82edmsh36540c704d6f982p1`;

  fetch(url, {
    headers: {
      "X-RapidAPI-Key": "199a7b82edmsh36540c704d6f982p130964jsne3d245b63a62",
      "X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayMovieDetails(data);
    })
    .catch((error) => console.log(error));
}

function displayMovieDetails(movie) {
  const results = document.getElementById("results");
  results.innerHTML = `
      <div class="movie-details">
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <p>Released: ${movie.Released}</p>
        <p>Runtime: ${movie.Runtime}</p>
        <p>Genre: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
        <p>Writer: ${movie.Writer}</p>
        <p>Actors: ${movie.Actors}</p>
        <p>Plot: ${movie.Plot}</p>
        <button class="back-button">Back</button>
      </div>
    `;
  
  const backButton = document.querySelector(".back-button");
  backButton.addEventListener("click", function () {
    const searchTerm = document.getElementById("search-input").value;
    searchMovies(searchTerm);
  });
}


function displayError() {
  const results = document.getElementById("results");
  results.innerHTML = "<p>No results found.</p>";
}



