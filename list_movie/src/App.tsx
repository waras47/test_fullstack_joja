import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('star wars');

  const apiKey = "2f46f2d0";
  const urlOMDB = `https://www.omdbapi.com/?apikey=${apiKey}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${urlOMDB}&s=${searchTerm}`);
      const results = response.data.Search || [];

      if (results.length === 0) {
        setError('Movies not found');
        setMovies([]);
        return;
      }

      setMovies(results);
      setError(null);
    } catch (error) {
      setError('An error occurred while fetching data');
      setMovies([]);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData();
  };

  return (
    <div className="App">
      <h1>List Movie</h1>
      <form onSubmit={handleSearchSubmit}>
        <label>
          Search:
          <input type="text" value={searchTerm} onChange={handleSearch} />
        </label>
        <button type="submit">Search</button>
      </form>
      <div className="movie-grid">
        {error && <p>{error}</p>}
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />
            <div className="movie-details">
              <strong>{movie.Title}</strong>
              <p>{movie.Year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
