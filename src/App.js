import React, {useState, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cancelBtn, setCancelBtn] = useState(false)

  useEffect(function(){
    fetchMoviesHandler()
  },[])
  
  const btnHandler = () => {
    setCancelBtn(false)
  }

  async function fetchMoviesHandler() {
    setLoading(true)
    setError(null)
    try{
      const response = await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        setCancelBtn(true)
        throw new Error('Something went wrong ....Retrying')
      }

      const data = await response.json()

      const transformedMovies = data.results.map((movieData) => {
        return{
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        }
      })
      setMovies(transformedMovies)
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
