import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {

  const history = useHistory()

  const addMovie = () => {


    history.push('/add-movie')


  }

  return (
    <div className="movie-list">
      <button onClick={addMovie} >Add a Movie</button>
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
    </div>
  );
}

export default MovieList;
