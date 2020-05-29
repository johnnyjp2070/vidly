import http from './httpService';
// const apiEndpoint = 'http://localhost:3900/api/movies';

export function getMovies() {
  return http.get(`/movies`);
}

export function deleteMovie(movieId) {
  return http.delete(`/movies/${movieId}`);
}

export function getMovie(movieId) {
  return http.get(`/movies/${movieId}`);
}

export function saveMovie(movie) {
  console.log(movie);

  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`/movies/${movie._id}`, body);
  }

  return http.post(`/movies`, movie);
  // let movieInDb = movies.find((m) => m._id === movie._id) || {};
  // movieInDb.title = movie.title;
  // movieInDb.genre = genresAPI.genres.find((g) => g._id === movie.genreId);
  // movieInDb.numberInStock = movie.numberInStock;
  // movieInDb.dailyRentalRate = movie.dailyRentalRate;
  // return http.get(`${apiUrl}/movies/`);
}
