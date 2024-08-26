import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function MoviesDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const movieDetail = useSelector(store => store.movieDetail);
    const genres = movieDetail.name
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

    return (
        <div data-testid="movieDetails">
            
            <section className="detail">

                <h2>Movie Details</h2>

                <div data-testid='movieItem' key={movieDetail ? movieDetail.id : ''}>
                <h3>{movieDetail ? movieDetail.title : ''}</h3>
                <img 
                    src={movieDetail ? movieDetail.poster : ''} 
                    alt={movieDetail.title} />
                
                <div>
                    {!genres ? '' : genres.map(genre => {
                        return (
                            <div key={genres.indexOf(genre)}>
                                <span>{genre}</span>
                            </div>
                        )
                    })}
                </div>
                <p>{movieDetail ? movieDetail.description : ''}</p>
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