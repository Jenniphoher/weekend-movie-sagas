import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function MovieForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)

    const [title, setTitle] = useState('');
    const [poster, setPoster] = useState('');
    const [description, setDescription] = useState('');
    const [genreInput, setGenreInput] = useState('');

    useEffect(() => {
        // GET for genres
        dispatch({ type: 'FETCH_GENRES' });
    }, [])


    const addMovie = (e) => {
        e.preventDefault();

        dispatch({
            type: 'ADD_MOVIE',
            payload: {
                title: title,
                poster: poster,
                description: description,
                genre_id: genreInput
            }
        })

        setTitle('');
        setPoster('');
        setDescription('');
        setGenreInput('');
    }


    return (
        <div>
            <form onSubmit={addMovie}>
                <input type="text"
                    placeholder="title of movie"
                    value={title}
                    onChange={e => setTitle(e.target.value)} />
                <input type="text"
                    placeholder="url of movie poster"
                    value={poster}
                    onChange={e => setPoster(e.target.value)} />
                <input type="text"
                    placeholder="description of movie"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />

                <select onChange={e => setGenreInput(e.target.value)}>
                    {!genres ? '' : genres.map((genre) => {
                        return (
                            <optgroup key={genre.id}>
                                <option value={genre.id}>{genre.name}</option>
                            </optgroup>
                        )
                    })}
                </select>
                
                <button>Submit</button>
                
            </form>
                
                <button onClick={() => {
                            history.push('/');
                        }}>Back</button>
            


        </div>
    )

}

export default MovieForm;