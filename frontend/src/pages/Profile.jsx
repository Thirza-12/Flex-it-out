import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/"); // Redirect to login if not logged in
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-xl text-center">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Profile</h2>
        {user ? (
          <>
            <p className="text-lg">Welcome, <span className="font-semibold">{user.name}</span>! 🎉</p>
            <p className="text-sm text-gray-400 mt-2">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-orange-500 p-2 rounded text-black font-semibold hover:bg-orange-600 transition w-full"
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-red-500">No user data found.</p>
        )}
      </div>
    </div>
  );
}
