import React from "react";

/**
 * Static AboutPage for MealBridge (no animations, no effects).
 */
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 tracking-tight drop-shadow-md">
        <span className="text-emerald-400">🌉 About</span>{" "}
        <span className="text-pink-400">Meal</span>
        <span className="text-orange-300">Bridge</span> ✨🍽
      </h1>

      <p className="text-lg text-fuchsia-300 max-w-3xl mb-4 bg-gray-800 p-4 rounded-xl shadow-lg">
        <strong className="text-yellow-400">MealBridge</strong> 🛠 is a
        purpose-driven platform created to reduce{" "}
        <span className="text-orange-400">food waste 🍕</span> and address{" "}
        <span className="text-red-400">hunger 🍽</span>. We connect{" "}
        <span className="text-cyan-300">restaurants 🏪</span> with surplus food
        to <span className="text-purple-300">NGOs 👐</span> and{" "}
        <span className="text-green-300">everyday people 🙋</span> who want to
        make a difference.
      </p>

      <p className="text-lg text-sky-300 max-w-3xl mb-4 bg-gray-800 p-4 rounded-xl shadow-lg">
        🍱 Every shared meal carries{" "}
        <span className="text-yellow-300">kindness</span>. 🥤 Every accepted
        item brings <span className="text-teal-300">dignity</span>. 🍪 Whether
        it's a snack or a full dish, every contribution supports lives and
        reduces waste. 🧾 Our system ensures that these actions are meaningful,
        trackable, and celebrated. 🎉
      </p>

      <p className="text-lg text-pink-300 max-w-3xl mb-4 bg-gray-800 p-4 rounded-xl shadow-lg">
        🌐 At <span className="text-orange-400">MealBridge</span>, we believe{" "}
        <span className="text-blue-300">technology 💡</span> should serve{" "}
        <span className="text-lime-300">humanity ❤</span>. By building a{" "}
        <span className="text-cyan-300">bridge of care 🤝</span>, supported by{" "}
        <span className="text-indigo-300">community spirit 🌟</span> and
        thoughtful design, we empower compassion at scale.
      </p>

      <p className="text-lg text-violet-300 max-w-3xl mb-4 bg-gray-800 p-4 rounded-xl shadow-lg">
        👥 Our platform encourages{" "}
        <span className="text-yellow-300">inclusion 🤗</span> and{" "}
        <span className="text-teal-300">responsibility 🧭</span>. We respect the
        dignity of every person and aim to inspire{" "}
        <span className="text-green-400">sustainable action 🌿</span>, making
        food redistribution a simple, everyday part of life. 🔄
      </p>

      <div className="mt-10 text-emerald-300 text-xl font-semibold bg-gray-800 p-6 rounded-xl shadow-xl">
        💚 Together, we turn{" "}
        <span className="text-yellow-400">leftovers 🍛</span> into{" "}
        <span className="text-lime-400">lifelines 🚑</span>. <br />✨ Because
        every meal deserves <span className="text-pink-300">meaning 💫</span>,
        and every person deserves <span className="text-blue-300">care 🫶</span>.
        🌍
      </div>
    </div>
  );
};

export default AboutPage;
