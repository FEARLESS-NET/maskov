import React, { useEffect, useMemo, useState } from "react";
import { movie } from "../Data/movies";
import { useTranslation } from 'react-i18next'


const Cinema = () => {
  const { t } = useTranslation();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("savedMovies")) || []);

  useEffect(() => {
    localStorage.setItem("savedMovies", JSON.stringify(saved));
  }, [saved]);

  const toggleSave = (e, film) => {
    e.stopPropagation();
    setSaved(prev =>
      prev.some(x => x.title === film.title)
        ? prev.filter(x => x.title !== film.title)
        : [...prev, film]
    );
  };

  const sliderMovies = useMemo(() => [...movie, ...movie], []);
  const filteredMovies = useMemo(() =>
    movie.filter(m => {
      const matchSearch = m.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" ? true : m.category === category;
      return matchSearch && matchCategory;
    }), [search, category]
  );


  
  const recommended = selectedMovie
    ? movie.filter(m => m.category === selectedMovie.category && m.title !== selectedMovie.title).slice(0, 5)
    : [];

  return (
    <div className="min-h-screen bg-black text-white px-5 overflow-hidden">
      
      {/* TITLE */}
      <h1 className="text-center text-5xl font-extrabold pt-12 mb-10
        bg-gradient-to-r from-red-500 via-yellow-300 to-purple-500
        text-transparent bg-clip-text drop-shadow-[0_0_20px_red]">
       {t('title')}
      </h1>

      {/* SEARCH + CATEGORY */}
      <div className="flex flex-col md:flex-row justify-center gap-5 mb-12">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔎 Kino qidirish..."
          className="w-full md:w-1/3 px-5 py-3 rounded-xl bg-gray-900 border border-red-900/40 focus:ring-2 focus:ring-red-500 outline-none"/>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="px-5 py-3 rounded-xl bg-gray-800 border border-red-900/60">
          <option value="all">{t('all')}</option>
          <option value="movie">{t('movie')}</option>
          <option value="cartoon">{t('cartoon')}</option>
          <option value="anime">{t('anime')}</option>
        </select>
      </div>

      {/* MOVIES */}
      <ul className="flex flex-wrap justify-center gap-14">
        {filteredMovies.map((item, i) => {
          const isSaved = saved.some(x => x.title === item.title);
          return (
            <li key={i} onClick={() => setSelectedMovie(item)}
              className="w-[270px] h-[480px] relative cursor-pointer bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-red-900/40 transition-all duration-300 hover:scale-110 hover:-translate-y-4 hover:shadow-red-500/60">

              {/* SAVE BUTTON */}
              <button onClick={(e) => toggleSave(e, item)}
                className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-sm font-bold transition-all ${isSaved ? "bg-green-600/80 shadow-[0_0_15px_green]" : "bg-red-600/80 shadow-[0_0_15px_red] hover:bg-red-700"}`}>
                {isSaved ? "✔ Saqlandi" : "⭐ Saqlash"}
              </button>

              {/* VIDEO PREVIEW */}
              <div className="relative w-full h-[340px] rounded-xl overflow-hidden">
                <img src={item.poster} alt={item.title} className="w-full h-full object-cover transition-opacity duration-500 hover:opacity-0"/>
                {item.trailer && (
                  <video src={item.trailer} className="absolute top-0 left-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500" muted loop autoPlay/>
                )}
              </div>

              <div className="p-3">
                <p className="text-center text-xl font-semibold text-red-300">{item.title}</p>
                <p className="text-center text-gray-400 text-sm">{item.year} · {item.genre.join(", ")}</p>
                <p className="text-yellow-400 text-sm mt-1">{"⭐".repeat(item.rating || 0)}</p>
                <p className="text-gray-400 text-sm mt-2 line-clamp-2">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ul>

      {/* MODAL */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex flex-col items-center justify-center z-50 px-4 md:px-0">
          <div className="bg-gray-900/90 border border-red-500/40 rounded-2xl w-full md:w-[60%] p-8 overflow-auto max-h-[90vh] relative">
            <button onClick={() => setSelectedMovie(null)} className="absolute top-3 right-4 text-3xl text-red-400">✖</button>

            <div className="flex flex-col md:flex-row gap-8">
              {/* POSTER + TRAILER */}
              <div className="relative w-full md:w-72 h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img src={selectedMovie.poster} className="w-full h-[500px] object-cover rounded-xl shadow-lg"/>
                {/* {selectedMovie.trailer && (
                  <video src={selectedMovie.trailer} className="absolute top-0 left-0 w-full h-full object-cover" controls autoPlay muted loop/>
                )} */}
              </div>

              {/* INFO */}
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-red-400">{selectedMovie.title}</h2>
                <p className="mt-4 text-gray-300">{selectedMovie.description}</p>
                <button onClick={(e) => toggleSave(e, selectedMovie)}
                  className="px-6 py-3 mt-5 bg-red-500 rounded-xl shadow-[0_0_20px_red] hover:bg-red-600 transition font-bold mb-4">
                  ⭐ {saved.some(x => x.title === selectedMovie.title) ? "Saqlangan" : "Saqlash"}
                </button>


                <iframe width="560" height="315" src={selectedMovie.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            {/* RECOMMENDATIONS */}
                {recommended.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-red-400 mb-4">{t('📌 Sizga tavsiya qilinadi')}</h3>
                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {recommended.map((rec, i) => (
                        <div key={i} className="min-w-[150px] cursor-pointer" onClick={() => setSelectedMovie(rec)}>
                          <img src={rec.poster} className="w-full h-40 object-cover rounded-lg"/>
                          <p className="text-center text-yellow-300 mt-1 text-sm">{rec.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
          </div>
        </div>
      )}

     
     
{/* SLIDER */}
<h2 className="text-center text-3xl font-bold mt-24 text-red-400">
  {t('recommend')}
</h2>

<div className="relative overflow-hidden py-8">
  <div className="flex gap-8 slider-track">
    {sliderMovies.map((m, i) => (
      <div
        key={i}
        onClick={() => setSelectedMovie(m)}
        className="
          w-[270px] h-[480px] flex-shrink-0 cursor-pointer
          bg-white/10 backdrop-blur-xl rounded-2xl
          shadow-xl shadow-red-900/40
          transition-all duration-300
          hover:scale-110 hover:-translate-y-4 hover:shadow-red-500/60
        "
      >
        {/* IMAGE */}
        <div className="relative w-full h-[340px] rounded-xl overflow-hidden">
          <img
            src={m.poster}
            alt={m.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* INFO */}
        <div className="p-3">
          <p className="text-center text-xl font-semibold text-red-300">
            {m.title}
          </p>
          <p className="text-center text-gray-400 text-sm">
            {m.year} · {m.genre?.join(", ")}
          </p>
          <p className="text-gray-400 text-sm mt-2 line-clamp-2">
            {m.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>

<style>{`
  .slider-track {
    width: max-content;
    animation: scrollSlider 40s linear infinite;
  }

  @keyframes scrollSlider {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }
`}</style>


    </div>
  );
};

export default Cinema;
