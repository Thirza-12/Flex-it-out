import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-orange-500">
          Get Fit. Stay Active. 💪
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4">
          AI-powered workouts to keep you motivated & fit!
        </p>
        <Link to="/workout" className="mt-4 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-lg font-semibold transition">
          Start Training 🚀
        </Link>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-4 md:px-20 py-16">
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-400">🏋️‍♂️ AI Workout Detection</h2>
          <p className="text-gray-400 mt-2">Train with real-time AI feedback on your form.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-400">📊 Live Stats & Leaderboard</h2>
          <p className="text-gray-400 mt-2">Compete with friends and track your progress.</p>
        </div>
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-orange-400">🎯 Fun Challenges</h2>
          <p className="text-gray-400 mt-2">Join fitness challenges & stay motivated.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-orange-400">Ready to Flex It Out? 💥</h2>
        <Link to="/login" className="mt-4 inline-block bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg text-lg font-semibold transition">
          Join Now 🚀
        </Link>
      </section>
    </div>
  );
};

export default Home;
