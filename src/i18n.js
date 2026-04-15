import i18n from "i18next";
import { initReactI18next } from "react-i18next";



i18n.use(initReactI18next).init({
  resources: {
    uz: {
      translation: {
        title: "🎬 KINO OLAMI",
        search: "🔎 Kino qidirish...",
        all: "Barchasi",
        movie: "Kino",
        cartoon: "Multfilm",
        anime: "Anime",
        save: "⭐ Saqlash",
        saved: "✔ Saqlandi",
        recommend: "📌 Sizga tavsiya qilinadi",
        premieres: "🔥 Premyeralar",
        descript: "description",
        home: "uy",
        cinema: "kinolar",
        Savings: "savings ",
        Test:"sinov",      
        subscription:"obunalar",
        MyMovie:"MeningKinolarim",
        saved :" Hozircha hech qanday kino saqlanmagan",
       SAVINGS:" 🎬 Saqlangan Kinolarm ",
       Ochirish:"ochirish",
       Abonentlik:"Abonentlik paketlariga qoshilishingiz bilan siz eksklyuziv premyeralarnikorish chegirmalardan foydalanish va VIP xizmatlarimizdan bahramandbolish imkoniga ega bolasiz",
       Paketlar:"💰 Kino Olamidagi Eng Yaxshi Paketlar",
       bonus:"🔥 Bonus takliflar",
       plan:" Planni Tanlash ",
       Mymovie:"meni kinoyim",
       kino:"Kino olamiga xush kelibsiz!"
      }
    },
    ru: {
      translation: {
        title: "🎬 МИР КИНО",
        search: "🔎 Поиск фильмов...",
        all: "Все",
        movie: "Фильм",
        cartoon: "Мультфильм",
        anime: "Аниме",
        save: "⭐ Сохранить",
        saved: "✔ Сохранено",
        recommend: "📌 Рекомендуем вам",
        premieres: "🔥 Премьеры",
        descript: "description",
        home: "дом",
        cinema: "фильмы",
        Savings: "сохранено",
        Test:"тест",      
        subscription:"подписки",
        MyMovie:"Mои Фильмы",
        saved :" Пока нет сохранённых фильмов",
        SAVINGS:" 🎬Мои сохраненные фильмы",
        Ochirish:"удалить",
        Abonentlik:"Оформив подписку на наши пакеты услуг, вы получите возможность смотреть эксклюзивные премьеры, пользоваться скидками и VIP-сервисом",
        Paketlar:"💰 Лучшие пакеты услуг в мире кино",
        bonus:"🔥 Бонусные предложения",
        plan:" Выберите план"  ,
        Mymovie:"моя филмы",
        kino:"Добро пожаловать в мир кино!"

      }
    },
    en: {
      translation: {
        title: "🎬 CINEMA WORLD",
        search: "🔎 Search movies...",
        all: "All",
        movie: "Movie",
        cartoon: "Cartoon",
        anime: "Anime",
        save: "⭐ Save",
        saved: "✔ Saved",
        recommend: "📌 Recommended for you",
        premieres: "🔥 Premieres",
        descript: "description",
        home: "home",
        cinema: "cinema",
        Savings: "savings",
        Test:"test",      
        subscription:"subscription",
        MyMovie:"My Movies",
        SAVINGS:"🎬 My saved movies ",
        saved :" No movies saved yet",
        Ochirish:"delete",
        Abonentlik:"By subscribing to our subscription packages, you will have the opportunity to watch exclusive premieres, take advantage of discounts, and enjoy our VIP services.",
        Paketlar:"💰 The Best Packages in the Cinema World",
        bonus:"🔥 Bonus Offers",
       plan:" Choose a plan ",
        Mymovie:"My Movie",
        kino:"Welcome to the world of cinema!"

        
      }
    }
  },
  lng: localStorage.getItem("lang") || "uz",
  fallbackLng: "uz",
  interpolation: { escapeValue: false }
});

export default i18n;
