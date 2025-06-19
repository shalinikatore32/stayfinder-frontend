import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  FaRegCheckCircle,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserFriends,
  FaReceipt,
} from "react-icons/fa";

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState(null);
  const bookingId = searchParams.get("bookingId");
  const receiptRef = useRef(); // Reference to the printable area

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  const handleDownload = () => {
    const originalContents = document.body.innerHTML;
    const printContents = receiptRef.current.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore full app after print
  };

  if (!booking) {
    return (
      <div className="text-center mt-24 text-gray-600 text-lg animate-pulse font-medium">
        Fetching your booking details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-12 md:px-10 font-sans">
      <div
        ref={receiptRef}
        className="max-w-2xl mx-auto bg-white border rounded-3xl shadow-2xl p-8 space-y-8"
      >
        <div className="text-center">
          <FaRegCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-green-600">
            Booking Successful!
          </h1>
          <p className="text-gray-600 mt-2 text-md">
            Thank you for choosing{" "}
            <span className="font-semibold text-blue-500">StayFinder</span>!
            Your booking receipt is below.
          </p>
        </div>

        <div className="border-t pt-6 space-y-4 text-gray-700 text-[15px]">
          <div className="flex items-center gap-2">
            <FaReceipt className="text-blue-500" />
            <p>
              <span className="font-semibold">Booking ID:</span> {booking._id}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-400" />
            <p>
              <span className="font-semibold">Stay:</span>{" "}
              {booking.listing.title} - {booking.listing.location}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            <p>
              <span className="font-semibold">Check-in:</span>{" "}
              {new Date(booking.checkInDate).toDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-500" />
            <p>
              <span className="font-semibold">Check-out:</span>{" "}
              {new Date(booking.checkOutDate).toDateString()}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaUserFriends className="text-yellow-600" />
            <p>
              <span className="font-semibold">Guests:</span> {booking.guests}
            </p>
          </div>
          <div className="flex items-center gap-2">
            💵
            <p>
              <span className="font-semibold">Total Paid:</span> ₹
              {booking.totalPrice}
            </p>
          </div>
          <div className="flex items-center gap-2">
            📌
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-green-600 font-semibold capitalize">
                {booking.status}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition shadow"
        >
          Download Receipt
        </button>

        <a
          href="/home"
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition shadow"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}
