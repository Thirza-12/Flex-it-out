import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          FLEX-IT-OUT
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-orange-400 transition duration-300">Home</Link>
          <Link to="/workout" className="hover:text-orange-400 transition duration-300">Workout</Link>
          <Link to="/leaderboard" className="hover:text-orange-400 transition duration-300">Leaderboard</Link>
          <Link to="/dashboard" className="hover:text-orange-400 transition duration-300">Tutorial</Link>
          <Link to="/profile" className="hover:text-orange-400 transition duration-300">Profile</Link>
        </div>

        {/* Login/Logout Button */}
        <div>
          {isLoggedIn ? (
            <button 
              onClick={handleLogout} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
