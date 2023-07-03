import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../movies/movie.modules.css";

export default function Movies() {
  const [moviesData, setMoviesData] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  // const [noSuggestions, setNosuggestions] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/movies");
        setMoviesData(response.data);
      } catch (error) {
        console.log("Error fetching movies", error);
      }
    };
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/movies/genres"
        );
        setGenreList(response.data);
        console.log(typeof genreList);
        console.log(genreList);
      } catch (error) {
        console.log("Error fetching genres", error);
      }
    };
    fetchGenres();
    fetchMovies();
  }, []);

  //Handling Button clicks
  const handleGenreFilterButton = async (genre) => {
    if(selectedGenres.includes(genre)){
      setSelectedGenres(selectedGenres.filter((g)=> g!== genre))
    }
    else{
      setSelectedGenres([...selectedGenres,genre])
    }
  };

  const filteredMovies = moviesData.filter((movie)=>{
    if(selectedGenres.length===0){
      return true;
    }
    else{
    return selectedGenres.every((genre)=> movie.genre[0].includes(genre))
    }
  })

  // if(filteredMovies.length===0){
  //   setNosuggestions(true)
  // }


  return (
    <div className="movies-section">
      <div className="header-section">
        <h2 className="website-title">IMDb</h2>
      </div>
      <div className="main-bar">
        <div className="movies-filter">
          <h3>Filter by Genre</h3>
          <div className="movies-genre-list">
            {genreList.map((genre) => (
              <button
                className="each-movie-genre-button"
                onClick={() => handleGenreFilterButton(genre)}
              >
                <div
                  style={{
                    backgroundColor:
                      selectedGenres.includes(genre) ? "#344b9c" : "#c0ceff",
                    color:selectedGenres.includes(genre) ? "white" : "black",
                  }}
                  className="each-movie-genre"
                >
                  <span>{genre}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="movies-card-section">
          {filteredMovies.map((movie) => (
            <div className="movie-card">
              <img className="movie-img" src={movie.img} alt="movie-img"></img>
              <div className="movie-details">
                <div className="movie-rating">
                  <span>🟌 {movie.rating[0]}</span>
                </div>
                <span className="movie-title">{movie.name}</span>
                <p>Released Year: {movie.year}</p>
                <p>Genre:</p>
                <div className="movie-genre">
                  {movie.genre[0].split(",").map((genre) => (
                    <div className="movie-genre-category">
                      <span>{genre}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {
          noSuggestions &&(
            <diV>
              <h1>Sorry!<br/>No movies found<br/>Try adding other filters</h1>
            </diV>
          )
        } */}
      </div>
    </div>
  );
}
