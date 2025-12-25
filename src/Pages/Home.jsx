import React, { useEffect, useState } from "react";

import { useTranslation } from 'react-i18next'

const Home = () => {
   const { t } = useTranslation();
  const [animate, setAnimate] = useState(false);
  const [index, setIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const bgImages = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvovKkBZsHV9BTcW1pbmPyCrSGJy5umAO9CQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5_w_j-Lh7-xW29Idn9PUzs0nv6j_GVnY-0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMOEk9I-tJjlNa_fF-L9fcS4iHQ7gnm5X05w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY_zZEHB4yKoPu-3RR-KVGwEWthwZlM-aYzw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGvP9KcCrBVPLmfIN8s68-EqUfnr5txqBig&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9pCkHvNxWCPQpGGy1zLRnW-RNhS2m_mvA&s"
  ];

  useEffect(() => {
    setAnimate(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const openModal = (type) => {
    const content = {
      home: "🏠 MyMovie — Sizni kino olamiga olib kiruvchi eng zamonaviy platforma. Premium tajribadan rohatlaning!",
      movies: "🎬 Filmlar — Siz uchun eng yaxshi filmlar, seriallar va anime kolleksiyasi. Har kuni yangilanadi!",
      about: "ℹ️ Biz haqimizda — MyMovie jamoasi kinoni sevuvchi va ulashuvchi yosh dasturchilardan iborat.",
      contact: "📩 Aloqa — Savollaringiz bo‘lsa biz bilan bog‘laning: support@mymovie.uz"
    };
    setModalContent(content[type]);
    setModalOpen(true);
  };

  return (
    <div className=" w-full relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">

      {/* BACKGROUND SLIDER */}
      <div className="absolute inset-0 w-full h-500 overflow-hidden">
        {bgImages.map((img, i) => (
          <div
            key={i}
            className={`
                absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[2000ms] ease-in-out
                ${i === index ? "opacity-100 scale-100" : "opacity-0 scale-105"}
              `}
            style={{
              backgroundImage: `url(${img})`,
              filter: "brightness(0.50)"
            }}
          ></div>
        ))}

        {/* cinematic gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/200 to-black" />
      </div>

      {/* TITLE */}
      <h1
        className={`text-6xl md:text-8xl font-extrabold text-center mb-28
        bg-gradient-to-r from-red-800 via-yellow-500 to-purple-500 text-transparent bg-clip-text
        drop-shadow-[0_0_60px_rgba(255,0,255,1)] animate-flicker
        transition-all duration-1500 ${animate ? "opacity-100" : "opacity-0 -translate-y-10"}`}
      >
        MyMovie 🎬
      </h1>

      {/* TAGLINE */}
      <p
        className={`text-xl md:text-3xl text-yellow-400 text-center mb-80
        transition-all duration-4000 delay-500
        ${animate ? "opacity-100" : "opacity-0 translate-y-10"}`}
      >
        {t("kino")}
      </p>

      {/* BEAUTIFUL FLOATING POSTERS */}
      <div className="absolute bottom-35 flex gap-6 animate-floating">
        {bgImages.slice(0, 6).map((src, i) => (
          <img
            key={i}
            src={src}
            className="w-28 md:w-40 rounded-xl shadow-[0_0_35px_rgb(255,0,255)]
            border border-purple-500/40 hover:scale-110 hover:shadow-[0_0_55px_cyan]
            transition-all duration-500 hover:-rotate-2"
          />
        ))}
      </div>

      {/* FOOTER */}
      <footer className="absolute bottom-0 w-full bg-black/800 backdrop-blur-xl border-t border-red-800/40 py-10">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6">

          {/* LOGO */}
          <div className="text-3xl font-extrabold bg-gradient-to-r from-red-900 via-yellow-400 to-purple-300 text-transparent bg-clip-text drop-shadow-[0_0_30px_red]">
            {t("Mymovie")}
          </div>

          {/* LINKS WITH MODAL */}
          <ul className="flex gap-8 text-gray-300 text-lg">
            <li className="hover:text-red-400 cursor-pointer" onClick={() => openModal("home")}>Home</li>
            <li className="hover:text-red-400 cursor-pointer" onClick={() => openModal("movies")}>Movies</li>
            <li className="hover:text-red-400 cursor-pointer" onClick={() => openModal("about")}>About</li>
            <li className="hover:text-red-400 cursor-pointer" onClick={() => openModal("contact")}>Contact</li>
          </ul>

          {/* SOCIALS */}
          <div className="flex gap-4 text-2xl text-gray-300">
            <span className="hover:text-red-500 cursor-pointer">🐦</span>
            <span className="hover:text-red-500 cursor-pointer">📘</span>
            <span className="hover:text-red-500 cursor-pointer">📸</span>
          </div>
        </div>
      </footer>

      {/* MODAL WINDOW */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-black/80 p-8 rounded-2xl shadow-[0_0_30px_red] max-w-md text-center border border-red-500/40">
            <h2 className="text-3xl font-bold mb-4 text-red-400">📢 Ma’lumot</h2>
            <p className="text-gray-300 mb-6">{modalContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg shadow-md"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* EXTRA ANIMATIONS */}
      <style>
        {`
          @keyframes floating {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-floating {
            animation: floating 5s ease-in-out infinite;
          }

          @keyframes flicker {
            0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
              opacity: 1;
              text-shadow: 0 0 20px #ff00ff, 0 0 40px #ff00ff;
            }
            20%, 22%, 24%, 55% {
              opacity: .5;
              text-shadow: none;
            }
          }
          .animate-flicker {
            animation: flicker 2.5s infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
