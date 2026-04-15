import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Savings = () => {
  const { t } = useTranslation();
  const [savedMovies, setSavedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // ✅ SAFE LOCALSTORAGE LOAD (FIXED)
  useEffect(() => {
    try {
      const raw = localStorage.getItem("savedMovies");

      if (!raw) {
        setSavedMovies([]);
        return;
      }

      const parsed = JSON.parse(raw);

      if (Array.isArray(parsed)) {
        setSavedMovies(parsed);
      } else {
        setSavedMovies([]);
      }
    } catch (err) {
      console.error("LocalStorage error:", err);
      setSavedMovies([]);
    }
  }, []);

  const removeMovie = (e, index) => {
    e.stopPropagation();
    const updated = savedMovies.filter((_, i) => i !== index);
    setSavedMovies(updated);
    localStorage.setItem("savedMovies", JSON.stringify(updated));
    setSelectedMovie(null);
  };

  // 🔥 FIX: YouTube universal embed converter
  const getEmbedUrl = (url) => {
    if (!url) return "";

    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }

    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }

    return url;
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba')",
            filter: "brightness(0.4)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black" />
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-20 py-14 px-6 md:px-10">

        <h2 className="text-center text-5xl font-extrabold mb-16
          bg-gradient-to-r from-red-500 via-yellow-300 to-purple-500
          text-transparent bg-clip-text">
          {t("SAVINGS")}
        </h2>

        {/* ✅ EMPTY STATE FIXED */}
        {savedMovies.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
           {t("saved")}
          </p>
        ) : (
          <div className="flex flex-wrap justify-center gap-10">
            {savedMovies.map((movie, idx) => (
              <div
                key={movie.id || movie.title || idx}
                onClick={() => setSelectedMovie(movie)}
                className="w-[260px] h-[460px] cursor-pointer
                  bg-white/10 backdrop-blur-xl rounded-2xl
                  border border-white/10
                  shadow-[0_0_25px_rgba(255,0,0,0.5)]
                  transition-all duration-300
                  hover:scale-105 hover:-translate-y-3 hover:shadow-red-500/60"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-[320px] object-cover rounded-t-2xl"
                />

                <div className="p-3">
                  <h3 className="text-lg font-bold text-red-300 text-center line-clamp-1">
                    {movie.title}
                  </h3>

                  <p className="text-gray-400 text-sm text-center">
                    {movie.year} · {movie.genre?.join(", ")}
                  </p>
                </div>

                <button
                  onClick={(e) => removeMovie(e, idx)}
                  className="mx-3 mb-3 w-[calc(100%-1.5rem)] py-2
                    bg-red-600 rounded-xl font-bold
                    hover:bg-red-700 transition"
                >
                  O‘chirish
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔥 MODAL */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg
          flex items-center justify-center z-50 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-900/90 border border-red-500/40
            rounded-2xl w-full md:w-[60%]
            p-6 md:p-8 max-h-[90vh] overflow-auto relative"
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-4 text-3xl text-red-400 hover:scale-110"
            >
              ✖
            </button>

            <div className="flex flex-col md:flex-row gap-6">

              {/* POSTER FIXED SIZE */}
              <img
                src={selectedMovie.poster}
                alt={selectedMovie.title}
                className="w-full md:w-[380px] h-[520px]
                object-cover rounded-xl shadow-xl"
              />

              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-red-400">
                  {selectedMovie.title}
                </h2>

                <p className="mt-4 text-gray-300">
                  {selectedMovie.description || "No description"}
                </p>

                <button
                  onClick={(e) =>
                    removeMovie(
                      e,
                      savedMovies.findIndex(
                        (m) => m.id === selectedMovie.id
                      )
                    )
                  }
                  className="px-6 py-3 mt-6 bg-red-500 rounded-xl
                    shadow-[0_0_20px_red] font-bold
                    hover:bg-red-600 transition"
                >
                  ❌ O‘chirish
                </button>

                {/* TRAILER FIXED */}
                {selectedMovie.trailer && (
                  <iframe
                    className="mt-6 w-full h-[300px] rounded-xl"
                    src={getEmbedUrl(selectedMovie.trailer)}
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