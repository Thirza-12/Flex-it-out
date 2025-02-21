import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/workouts/leaderboard");
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-orange-400">🏆 Leaderboard</h1>
      
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-4">
        <table className="w-full text-left">
          <thead>
            <tr className="text-orange-400 border-b border-gray-700">
              <th className="p-2">Rank</th>
              <th className="p-2">Name</th>
              <th className="p-2">Total Reps</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((user, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="p-2 text-center font-semibold">{index + 1}</td>
                  <td className="p-2">{user._id}</td>
                  <td className="p-2 font-bold text-orange-300">{user.totalReps}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center p-4 text-gray-400">
                  No leaderboard data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
