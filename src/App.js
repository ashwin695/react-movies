import React, {useState, useEffect} from 'react';
import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cancelBtn, setCancelBtn] = useState(false)

  useEffect(function(){
    fetchMoviesHandler()
  },[])

  async function addMovieHandler(movie){
    const response = await fetch('https://react-movies-a091d-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json
  }
  
  const btnHandler = () => {
    setCancelBtn(false)
  }

  async function fetchMoviesHandler() {
    setLoading(true)
    setError(null)
    try{
      /* const response = await fetch('https://swapi.dev/api/films/') */
      const response = await fetch('https://react-movies-a091d-default-rtdb.firebaseio.com/movies.json')
      if(!response.ok){
        setCancelBtn(true)
        throw new Error('Something went wrong ....Retrying')
      }

      const data = await response.json()

      const loadedMovies = []

      for(const key in data) {
        loadedMovies.push({
          id:key,
          title: data[key].title,
          openingText: data[key].text,
          releaseDate: data[key].date,
        })
      }

      /* const transformedMovies = data.map((movieData) => {
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      }) */
      setMovies(loadedMovies)
    } catch( error )
    {
      setError(error.message)
    }
    setLoading(false)
  }

    if(cancelBtn){
      setInterval(()=>{
        fetchMoviesHandler()
      }, 5000)
    }

  let content = <p>Found No Movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  }

  if(error)
  {
    content = <p>{error}</p>
  }

  if(loading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>

      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>

      <section>
        {content}
        {
          cancelBtn && <button onClick={btnHandler}>Cancel</button>
        }
      </section>
    </React.Fragment>
  );
}

export default App;
