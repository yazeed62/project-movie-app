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
        <button class="like-button">like</button>
        <p class="like-count">0</p>
        <div class="comment-section">
          <input type="text" class="comment-input" placeholder="Leave a comment">
          <button class="comment-button">Comment</button>
          <ul class="comment-list"></ul>
        </div>          
      `;
    const likeButton = movieCard.querySelector(".like-button");
    const likeCount = movieCard.querySelector(".like-count");
    let count = 0;

    likeButton.addEventListener("click", function () {
      count++;
      likeCount.textContent = count;
    });

    const commentInput = movieCard.querySelector(".comment-input");
    const commentButton = movieCard.querySelector(".comment-button");
    const commentList = movieCard.querySelector(".comment-list");

    commentButton.addEventListener("click", function () {
      const comment = commentInput.value;
      if (comment !== "") {
        const commentItem = document.createElement("li");
        commentItem.textContent = comment;
        commentList.appendChild(commentItem);
        commentInput.value = "";
      }
    });

    results.appendChild(movieCard);
  });

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
