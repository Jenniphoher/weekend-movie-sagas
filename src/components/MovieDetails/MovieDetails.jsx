import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function MoviesDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);
    const params = useParams();
    const movieId = params.id;

    useEffect(() => {
        fetchMovieDetail();
    }, [movieId])

    const fetchMovieDetail = () => {
        dispatch({
            type: 'FETCH_DETAIL',
            payload: movieId
        })
    }

    console.log('MovieDetails data:', movies);

    return (
        <div data-testid="movieDetails">
            <h2>Movie Details</h2>

            <section className="detail">

                <div data-testid='movieItem' key={movies.id}>
                <h3>{movies.title}</h3>
                <img 
                    src={movies.poster} 
                    alt={movies.title} />
                
                <div>
                    {movies.name.map(genre => {
                        return (
                            <span>{genre}</span>
                        )
                    })}
                </div>
                <p>{movies.description}</p>
                </div>
                

                <button data-testid="toList"
                    onClick={() => {
                        history.push('/')
                    }}>Home</button>

            </section>

            
        </div>
    )

}

export default MoviesDetails;