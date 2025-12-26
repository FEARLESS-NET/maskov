import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Paketlar = () => {
  const { t } = useTranslation();

  // 🔹 QO‘SHILDI
  const [showLogin, setShowLogin] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const savingsPlans = [
    {
      title: "Basic Plan",
      price: "$9.99 / oy",
      benefits: [
        "Cheklangan kino ko‘rish",
        "Standart sifatli streaming",
        "Reklama bilan birga",
      ],
      color: "from-blue-500 to-blue-700",
    },
    {
      title: "Premium Plan",
      price: "$19.99 / oy",
      benefits: [
        "Cheksiz kino ko‘rish",
        "Full HD / 4K sifat",
        "Reklamasiz tajriba",
        "VIP film premyeralariga kirish",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Ultimate Plan",
      price: "$29.99 / oy",
      benefits: [
        "Barcha Premium imkoniyatlar",
        "Eksklyuziv kino premyeralar",
        "VIP qo‘llab-quvvatlash",
        "Bonus sovg‘alar va chegirmalar",
      ],
      color: "from-red-500 to-yellow-500",
    },
  ];

  // 🔹 LOGIN FUNKSIYA
  const handleLogin = () => {
    if (!email || !password) return;

    setShowLogin(false);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-10">

      {/* 🔔 NOTIFICATION */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in">
          <div className="bg-green-500 text-black px-6 py-4 rounded-xl shadow-2xl flex gap-3 items-center">
            <span className="text-2xl">✅</span>
            <p className="font-bold">Muvaffaqiyatli kirildi!</p>
          </div>
        </div>
      )}

      <h1 className="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text">
        {t("Paketlar")}
      </h1>

      {/* PLAN CARDS */}
      <div className="flex flex-wrap justify-center gap-10">
        {savingsPlans.map((plan, idx) => (
          <div
            key={idx}
            className={`w-[300px] p-6 rounded-2xl shadow-xl bg-gradient-to-br ${plan.color}
            transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
          >
            <h2 className="text-2xl font-bold mb-4">{plan.title}</h2>
            <p className="text-xl font-semibold mb-6 text-yellow-300">
              {plan.price}
            </p>

            <ul className="mb-6 space-y-2">
              {plan.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-green-400">✔</span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* 🔹 O‘ZGARTIRILDI */}
            <button
              onClick={() => setShowLogin(true)}
              className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-300 transition"
            >
              {t("plan")}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-red-400 mb-6">
          {t("bonus")}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {t("Abonentlik")}
        </p>
      </div>

      {/* 🔐 LOGIN MODAL */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-40">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl w-[350px] animate-scale-in">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-400">
              Login
            </h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-red-500"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-6 px-4 py-3 rounded-xl bg-gray-800 outline-none focus:ring-2 focus:ring-red-500"
            />

            <button
              onClick={handleLogin}
              className="w-full py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold"
            >
              Login
            </button>

            <button
              onClick={() => setShowLogin(false)}
              className="w-full mt-3 text-gray-400 hover:text-white"
            >
              Bekor qilish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paketlar;
