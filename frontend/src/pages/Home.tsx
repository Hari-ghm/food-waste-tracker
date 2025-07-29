import homePgImage from "../assets/home_pg_image.jpg";

const Home = () => {
  return (
    <div className="p-6 min-h-screen bg-black text-white font-sans">
      <main className="max-w-3xl mx-auto text-center">
        <h2 className="text-5xl font-bold text-pink-200 mb-4 drop-shadow-lg">
          Welcome to the Food Waste Tracker
        </h2>
        <p className="text-xl text-purple-100 mb-8">
          Track your daily food waste, donate excess food, and reduce your
          impact! Perfect for households, NGOs, and restaurants.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-pink-400 hover:bg-pink-500 text-white px-6 py-3 rounded-xl text-lg shadow-lg">
            Get Started
          </button>
          <button className="border-2 border-pink-300 text-pink-300 px-6 py-3 rounded-xl text-lg shadow-lg hover:bg-pink-100 hover:text-gray-900">
            Learn More
          </button>
        </div>

        <img
          src={homePgImage}
          alt="Food waste illustration"
          className="mt-12 w-full max-w-md mx-auto rounded-xl shadow-2xl"
        />
      </main>

    </div>
  );
};

export default Home;
