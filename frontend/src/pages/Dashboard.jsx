import { useState } from "react";
import SquatGif from "../assets/squats.mp4";
import PushupGif from "../assets/a.mp4";
import BurpeeGif from "../assets/burpee.mp4";
import PlankGif from "../assets/plank.mp4";
import DeadliftGif from "../assets/deadlift.mp4";
import PullupGif from "../assets/pullups.mp4";

const ExerciseDetails = ({ exerciseName, exerciseGif, steps }) => {
  return (
    <div className="flex mt-6">
      <div className="w-1/4"> {/* Decreased video div width */}
        <video autoPlay loop className="w-full">
          <source src={exerciseGif} type="video/mp4" />
        </video>
      </div>
      <div className="w-2/3 pl-6">
        <h3 className="text-2xl font-bold text-orange-500 mb-4">{exerciseName}</h3>
        {steps.map((step, index) => (
          <p key={index} className="text-white mb-2">{step}</p>
        ))}
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setActiveCategory(category === activeCategory ? null : category); // Toggle category
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">Welcome to Tutorial</h1>

      {/* Category Buttons */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleCategoryClick("beginner")}
          className={`bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition ${activeCategory === "beginner" ? "w-full" : ""}`}
        >
          Beginner
        </button>
        <button
          onClick={() => handleCategoryClick("intermediate")}
          className={`bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition ${activeCategory === "intermediate" ? "w-full" : ""}`}
        >
          Intermediate
        </button>
        <button
          onClick={() => handleCategoryClick("advanced")}
          className={`bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition ${activeCategory === "advanced" ? "w-full" : ""}`}
        >
          Advanced
        </button>
      </div>

      {/* Show Exercises based on Category */}
      {activeCategory === "beginner" && (
        <>
          <ExerciseDetails
            exerciseName="Squat"
            exerciseGif={SquatGif}
            steps={[
              "Stand with your feet shoulder-width apart, toes pointing slightly out.",
              "Lower your body by bending your knees and hips, keeping your chest up and back straight.",
              "Lower down as far as you can, making sure your knees don't go past your toes.",
              "Push through your heels to stand back up to the starting position."
            ]}
          />
          <ExerciseDetails
            exerciseName="Push-Up"
            exerciseGif={PushupGif}
            steps={[
              "Start in a plank position with your hands slightly wider than shoulder-width apart.",
              "Lower your body towards the ground by bending your elbows.",
              "Push through your palms to return to the starting position."
            ]}
          />
        </>
      )}

      {activeCategory === "intermediate" && (
        <>
          <ExerciseDetails
            exerciseName="Burpee"
            exerciseGif={BurpeeGif}
            steps={[
              "Start standing, then squat down and place your hands on the floor.",
              "Kick your feet back into a plank position, perform a push-up.",
              "Jump your feet back towards your hands, then explode up into a jump."
            ]}
          />
          <ExerciseDetails
            exerciseName="Plank"
            exerciseGif={PlankGif}
            steps={[
              "Lie face down, then lift your body up onto your forearms and toes.",
              "Keep your body in a straight line, engaging your core.",
              "Hold the position as long as you can."
            ]}
          />
        </>
      )}

      {activeCategory === "advanced" && (
        <>
          <ExerciseDetails
            exerciseName="Deadlift"
            exerciseGif={DeadliftGif}
            steps={[
              "Stand with your feet shoulder-width apart, the barbell over your mid-foot.",
              "Bend at the hips and knees, grip the barbell, and engage your core.",
              "Lift the barbell by extending your hips and knees simultaneously.",
              "Lower the barbell back to the ground with control."
            ]}
          />
          <ExerciseDetails
            exerciseName="Pull-Up"
            exerciseGif={PullupGif}
            steps={[
              "Grab the pull-up bar with your palms facing away, hands shoulder-width apart.",
              "Hang from the bar with your arms fully extended.",
              "Pull your chin above the bar by engaging your back and biceps.",
              "Lower yourself back down with control."
            ]}
          />
        </>
      )}
    </div>
  );
}
