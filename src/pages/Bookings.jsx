import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaDownload,
  FaUserFriends,
} from "react-icons/fa";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/bookings/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewReceipt = (bookingId) => {
    alert(`Viewing receipt for booking ID: ${bookingId}`);
  };

  const handleDownloadReceipt = (bookingId) => {
    alert(`Downloading receipt for booking ID: ${bookingId}`);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-600";
      case "pending":
        return "bg-yellow-100 text-yellow-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const renderSkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2 text-right">
          <div className="h-5 w-20 bg-gray-200 rounded ml-auto"></div>
          <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
        </div>
      </div>
      <div className="flex gap-3 mb-4">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-4 w-5 bg-gray-200 rounded"></div>
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded ml-auto"></div>
      </div>
      <div className="flex gap-4">
        <div className="h-8 w-28 bg-gray-200 rounded-full"></div>
        <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-rose-50 min-h-screen p-4 sm:p-8 rounded-xl shadow-inner">
      <h3 className="text-3xl font-bold text-emerald-700 mb-8 tracking-tight">
        Your Bookings
      </h3>

      {loading ? (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>{renderSkeletonCard()}</div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-gray-500 italic">You have no bookings yet.</p>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 transition duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="flex items-center gap-2 text-xl font-semibold text-emerald-700 mb-1">
                    <FaHome />
                    {booking.listing.title}
                  </h4>
                  <p className="flex items-center gap-2 text-sm text-gray-500">
                    <FaMapMarkerAlt />
                    {booking.listing.location}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-lg font-bold text-rose-600">
                    ₹{booking.totalPrice}
                  </p>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid sm:flex sm:items-center gap-3 text-sm text-gray-600 mb-5">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-teal-500" />
                  <span>{new Date(booking.checkInDate).toDateString()}</span>
                </div>
                <span className="hidden sm:block text-gray-400">→</span>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-teal-500" />
                  <span>{new Date(booking.checkOutDate).toDateString()}</span>
                </div>
                <div className="flex items-center gap-2 ml-auto text-gray-500 font-medium">
                  <FaUserFriends />
                  Guests: {booking.guests}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                <button
                  onClick={() => handleViewReceipt(booking._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition text-sm font-medium"
                >
                  <FaEye />
                  View Receipt
                </button>
                <button
                  onClick={() => handleDownloadReceipt(booking._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition text-sm font-medium"
                >
                  <FaDownload />
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
