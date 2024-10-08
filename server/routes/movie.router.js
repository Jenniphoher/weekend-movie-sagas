const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {
  const query = `
    SELECT * FROM "movies"
      ORDER BY "title" ASC;
  `;
  pool.query(query)
    .then(result => {
      // console.log('GET movies sent:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
    INSERT INTO "movies" 
      ("title", "poster", "description")
      VALUES
      ($1, $2, $3)
      RETURNING "id";
  `;
  const insertMovieValues = [
    req.body.title,
    req.body.poster,
    req.body.description
  ]
  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, insertMovieValues)
    .then(result => {
      // ID IS HERE!
      console.log('New Movie Id:', result.rows[0].id);
      const createdMovieId = result.rows[0].id

      // Now handle the genre reference:
      const insertMovieGenreQuery = `
        INSERT INTO "movies_genres" 
          ("movie_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const insertMovieGenreValues = [
        createdMovieId,
        req.body.genre_id
      ]
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, insertMovieGenreValues)
        .then(result => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // 👈 Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const sqlText = `
  
  SELECT "title", "poster", "description", movies_genres.genre_id, movies_genres.movie_id, genres.name FROM "movies"
	JOIN "movies_genres"
		ON movies.id = movies_genres.movie_id
	JOIN "genres"
		ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1;
  
  `
  const sqlValue = [id]
  pool.query(sqlText, sqlValue)
  .then((result) => {
    // console.log('Server GET movie detail:', result.rows);

    res.send(movieIdArray(result.rows));
  }) .catch((err) => {
    console.log('Server GET movie details:', err);
    res.sendStatus(500);
  })

})

module.exports = router;

const movieIdArray = (array) => {
  let movieObj = {}

  movieObj.title = array[0].title;
  movieObj.poster = array[0].poster
  movieObj.description = array[0].description
  movieObj.genre_id = []
  movieObj.movie_id = array[0].movie_id
  movieObj.name = []
  
  for(let obj of array) {
    movieObj.genre_id.push(obj.genre_id)
    movieObj.name.push(obj.name)
  }

  return movieObj;

}