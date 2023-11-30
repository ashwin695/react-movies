import React, {useState, useEffect} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import {Form} from 'react-bootstrap';
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
        <form id="add-form" action="#" class="container form1" style={{ display:'flex', flexDirection:'column' }}>
          <div style={{ padding: 10 }}>
              <label>Title </label>
          </div>
          <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} required />

          <div style={{ padding: 10 }}>
              <label>Opening Text </label>
          </div>
          <textarea rows="8" type="text" onChange={(e)=>setText(e.target.value)} name="opening_text" required />
          
          <div style={{ padding: 10 }}>
              <label>Release Date </label>
          </div>
          <input type="text" onChange={(e)=>setDate(e.target.value)} name="release_date" required />

          <div style={{ padding: 20 }}>
            <Button variant="outline-secondary" id="button-addon2">
                Add Movies
            </Button>
          </div>
        </form>
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
