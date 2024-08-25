import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";

function MoviesDetails() {
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div data-testid="movieDetails">
            {/* <h2>Movie Details</h2> */}

            <button data-testid="toList"
                    onClick={() => {
                        history.push('/')
                    }}>Home</button>
        </div>
    )

}

export default MoviesDetails;