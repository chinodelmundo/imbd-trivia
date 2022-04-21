function Movie({ movie, showRating }) {
  return (
    <div className="movie">
      <img className="movie-poster" alt="movie poster" src={movie.image} />
      <div>
        <div className="movie-title">{movie.fullTitle}</div>
        {showRating && <div className="movie-rating">{movie.imDbRating}</div>}
        {!showRating && <div className="movie-rating blurred">0.0</div>}
      </div>
    </div>
  );
}

export default Movie;
