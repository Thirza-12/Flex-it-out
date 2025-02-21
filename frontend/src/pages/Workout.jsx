import React, { useState } from "react";
import PoseDetector from "../components/PoseDetector";
import BicepCurlGif from "../assets/curls.mp4"; // Make sure to change the gif or video path if needed

function Workout() {
  const [startWorkout, setStartWorkout] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black relative">
      <h1 className="text-3xl font-bold text-white mb-3">🔥 Ready to Train? 🔥</h1>

      {/* Display the exercise video with dynamic size */}
      <div className={`transition-all duration-500 ${startWorkout ? "w-1/6 fixed bottom-5 right-5" : "w-1/4"}`}>
        <video autoPlay loop className="w-full rounded-lg shadow-lg">
          <source src={BicepCurlGif} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {!startWorkout ? (
        <button
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg text-lg shadow-lg transition duration-300 mt-4"
          onClick={() => setStartWorkout(true)}
        >
          🚀 Let's Do It! 🚀
        </button>
      ) : (
        <div className="flex flex-col items-center">
          {/* Pass startWorkout as a prop */}
          <PoseDetector startWorkout={startWorkout} />
          <button
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg transition duration-300"
            onClick={() => setStartWorkout(false)}
          >
            🛑 Stop Workout 🛑
          </button>
        </div>
      )}
    </div>
  );
}

export default Workout;
