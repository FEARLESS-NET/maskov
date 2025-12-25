import React, { useEffect, useState } from "react";

const API_KEY = 'fca118e4ff23f8cf1edadf8a5a0b2dc5';
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const Test = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 20 }} className=" top-30 right-30 bg-red-600/80 px-7 py-4 rounded-xl shadow-[0_0_40px_red] from-green-800 via-blue-400 to-purple-500 text-transparent bg-clip-text drop-shadow-[0_0_15px_green]">
      {movies.map(movie => (
        <div key={movie.id} className="">
          <img src={IMG_URL + movie.poster_path} alt={movie.title} className="relative rounded-2xl bg-white/10 backdrop-blur-xl 
                         shadow-xl shadow-red-900/40 overflow-hidden cursor-pointer group 
                         hover:scale-110 hover:-translate-y-3 transition duration-300"/>
          <h4>{movie.title}</h4>
          <p>⭐ {movie.vote_average}</p>
        </div>
      ))}
    </div>
  );
}

export default Test