import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";
import {
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaMapMarkerAlt,
  FaTv,
  FaUtensils,
  FaUsers,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";

export default function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/listings/${id}`
        );
        setListing(res.data);
      } catch (err) {
        toast.error("Failed to load listing.");
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/login");

    if (!checkInDate || !checkOutDate) {
      toast.warn("Select valid dates");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/bookings/create-checkout-session`,
        {
          userId: user._id,
          listingId: listing._id,
          checkInDate,
          checkOutDate,
          guests,
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      toast.error("Something went wrong with booking");
    }
  };

  // Skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen py-10 px-4 md:px-20 animate-pulse space-y-8">
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div className="h-[400px] bg-gray-200 rounded-3xl"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-1/4 mt-6"></div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-5/6"></div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[400px] h-[500px] bg-gray-200 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <p className="text-center mt-20 text-red-500 text-lg font-semibold">
        Listing not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            {listing.title}
          </h1>
          <p className="text-lg text-gray-500 flex items-center gap-2">
            <FaMapMarkerAlt className="text-rose-500" />
            {listing.location}
          </p>
        </header>

        {/* Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl">
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-[400px] object-cover hover:scale-[1.01] transition duration-300"
          />
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* LEFT: Description + Amenities + Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Overview */}
            <section>
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {listing.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Amenities
              </h2>
              <ul className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
                <li className="flex items-center gap-2">
                  <FaWifi className="text-rose-500" /> Free Wi-Fi
                </li>
                <li className="flex items-center gap-2">
                  <FaParking className="text-rose-500" /> Parking
                </li>
                <li className="flex items-center gap-2">
                  <FaSwimmingPool className="text-rose-500" /> Pool Access
                </li>
                <li className="flex items-center gap-2">
                  <FaTv className="text-rose-500" /> Smart TV
                </li>
                <li className="flex items-center gap-2">
                  <FaUtensils className="text-rose-500" /> Kitchen
                </li>
              </ul>
            </section>

            {/* Listing Info */}
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">
                Listing Info
              </h2>
              <ul className="text-gray-700 text-lg space-y-2">
                <li className="flex items-center gap-2">
                  <FaUsers className="text-rose-500" /> Max Guests:{" "}
                  {listing.maxGuests}
                </li>
                <li className="flex items-center gap-2">
                  <FaCalendarAlt className="text-rose-500" /> Available From:{" "}
                  {new Date(listing.availableFrom).toDateString()}
                </li>
                <li className="flex items-center gap-2">
                  <FaCalendarAlt className="text-rose-500" /> Available To:{" "}
                  {new Date(listing.availableTo).toDateString()}
                </li>
                <li className="flex items-center gap-2">
                  <FaRupeeSign className="text-rose-500" /> ₹
                  {listing.pricePerNight}/night
                </li>
              </ul>
            </section>
          </div>

          {/* RIGHT: Booking Card */}
          <div className="bg-gray-100 p-6 rounded-3xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Book Your Stay
            </h3>

            {/* Dates */}
            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">
                Check-in
              </label>
              <DatePicker
                selected={checkInDate}
                onChange={(date) => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                placeholderText="Select date"
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            <div className="mb-4">
              <label className="text-gray-700 font-medium block mb-1">
                Check-out
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate}
                placeholderText="Select date"
                className="w-full p-3 rounded-lg border border-gray-300"
              />
            </div>

            {/* Guests */}
            <div className="mb-6">
              <label className="text-gray-700 font-medium block mb-1">
                Guests
              </label>
              <input
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                min={1}
                max={listing.maxGuests}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Max allowed: {listing.maxGuests}
              </p>
            </div>

            {/* Summary */}
            <div className="space-y-1 mb-6 text-gray-700 text-base">
              <p>
                <span className="font-medium">Check-in:</span>{" "}
                {checkInDate ? checkInDate.toDateString() : "-"}
              </p>
              <p>
                <span className="font-medium">Check-out:</span>{" "}
                {checkOutDate ? checkOutDate.toDateString() : "-"}
              </p>
              <p>
                <span className="font-medium">Guests:</span> {guests}
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 rounded-full font-semibold text-lg shadow-md hover:shadow-lg transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
