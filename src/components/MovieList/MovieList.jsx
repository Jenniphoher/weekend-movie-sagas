import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './MovieList.css';

function MovieList() {

  const dispatch = useDispatch();
  const history = useHistory();
  const movies = useSelector(store => store.movies);

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <main>
      <h2>MovieList</h2>
      <section className="movies">

        {movies.map(movie => {
          return (
            <div data-testid='movieItem' key={movie.id}>
              <h3>{movie.title}</h3>
              <img data-testid="toDetails"
                    src={movie.poster} 
                    alt={movie.title}
                    onClick={() => {
                      history.push(`/movies/${movie.id}`)
                    }} />
            </div>
          );
        })}

      </section>

      <button onClick={() => {
          history.push('/form');
        }}>Add Movie</button>
    </main>
  );
}

export default MovieList;
