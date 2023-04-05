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
  results.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
        <img src="${movie.Poster}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="like-button">Like</button>
      `;
    results.appendChild(movieCard);
  });

  
  const likeButtons = document.querySelectorAll(".like-button");

  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const card = event.target.closest(".movie-card");
      const likeCount = card.querySelector(".like-count");
      let count = parseInt(likeCount.textContent);
      count++;
      likeCount.textContent = count;
    });
  });
}

function displayError() {
  const results = document.getElementById("results");
  results.innerHTML = "<p>No results found.</p>";
}


