import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import MovieDetails from '../MovieDetails/MovieDetails';
import MovieForm from '../MovieForm/MovieForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route exact path="/movies/:id" >
          <MovieDetails />
        </Route>

        {/* Add Movie page */}
        <Route exact path='/form' >
          <MovieForm />
        </Route>
        
      </Router>
    </div>
  );
}

export default App;
