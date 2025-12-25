import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Savings = () => {
  const { t } = useTranslation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // LOCALSTORAGE DAN O‘QISH
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(saved);
  }, []);

  // O‘CHIRISH
  const removeMovie = (e, index) => {
    e.stopPropagation();
    const updated = savedMovies.filter((_, i) => i !== index);
    setSavedMovies(updated);
    localStorage.setItem("savedMovies", JSON.stringify(updated));
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-10">
      <h2 className="text-center text-5xl font-extrabold mb-16
        bg-gradient-to-r from-red-500 via-yellow-300 to-purple-500
        text-transparent bg-clip-text">
        {t("SAVINGS")}
      </h2>

      {savedMovies.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          {t("saved")}
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-14">
          {savedMovies.map((movie, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedMovie(movie)}
              className="w-[270px] h-[480px] cursor-pointer
                bg-white/10 backdrop-blur-xl rounded-2xl
                shadow-xl shadow-red-900/40
                transition-all duration-300
                hover:scale-110 hover:-translate-y-4"
            >
              <img
                src={movie.poster}
                className="w-full h-[340px] object-cover rounded-xl"
              />
              <div className="p-3">
                <h3 className="text-xl font-bold text-red-300 text-center">
                  {movie.title}
                </h3>
                <p className="text-gray-400 text-sm text-center">
                  {movie.year} · {movie.genre?.join(", ")}
                </p>
              </div>

              <button
                onClick={(e) => removeMovie(e, idx)}
                className="mx-4 mb-4 w-[calc(100%-2rem)] py-2
                  bg-red-600 rounded-xl font-bold
                  hover:bg-red-700 transition"
              >
                O‘chirish
              </button>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg
          flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900/90 border border-red-500/40
            rounded-2xl w-full md:w-[60%]
            p-8 max-h-[90vh] overflow-auto relative">

            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-4 text-3xl text-red-400"
            >
              ✖
            </button>

            <div className="flex flex-col md:flex-row gap-8">
              {/* POSTER */}
              <img
                src={selectedMovie.poster}
                className="w-full md:w-72 h-[450px]
                  object-cover rounded-xl shadow-lg"
              />

              {/* INFO */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-red-400">
                  {selectedMovie.title}
                </h2>

                <p className="mt-4 text-gray-300">
                  {selectedMovie.description}
                </p>

                <button
                  onClick={(e) =>
                    removeMovie(e, savedMovies.findIndex(m => m.title === selectedMovie.title))
                  }
                  className="px-6 py-3 mt-6 bg-red-500 rounded-xl
                    shadow-[0_0_20px_red] font-bold
                    hover:bg-red-600 transition"
                >
                  ❌ Saqlanganlardan o‘chirish
                </button>

                {/* TRAILER */}
                {selectedMovie.trailer && (
                  <iframe
                    className="mt-6 w-full h-[315px] rounded-xl"
                    src={selectedMovie.trailer}
                    title="Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Savings;
