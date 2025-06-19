import { FaUserCircle, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md flex items-center gap-6 min-h-[120px]">
      {loading ? (
        <>
          <div className="text-6xl text-red-600 animate-pulse">
            <FaUserCircle />
          </div>
          <div className="flex-1 space-y-3 animate-pulse">
            <div className="h-6 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-60 bg-gray-200 rounded"></div>
          </div>
          <div className="h-10 w-28 bg-gray-300 rounded-lg animate-pulse"></div>
        </>
      ) : user ? (
        <>
          <FaUserCircle className="text-6xl text-red-600" />
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2">
            <FaEdit />
            Edit
          </button>
        </>
      ) : (
        <p className="text-gray-500">Profile data could not be loaded.</p>
      )}
    </div>
  );
}
