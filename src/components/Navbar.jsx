import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaSearch,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || null;

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    if (!location && !checkIn && !checkOut && !guests && !price) {
      navigate("/home");
      return;
    }

    const queryObject = {};
    if (location) queryObject.location = location;
    if (checkIn) queryObject.checkIn = checkIn;
    if (checkOut) queryObject.checkOut = checkOut;
    if (guests) queryObject.guests = guests;
    if (price) queryObject.price = price;

    const query = new URLSearchParams(queryObject).toString();
    navigate(`/search-results?${query}`);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-3xl font-bold text-rose-500 hover:text-rose-600"
          >
            StayFinder
          </Link>

          {/* Desktop Tabs */}
          <div className="hidden md:flex space-x-10">
            <div className="flex flex-col items-center text-gray-700 hover:text-rose-500 cursor-pointer">
              <img
                src="https://img.icons8.com/ios-filled/24/home.png"
                alt="Homes"
                className="h-5 mb-1"
              />
              <span className="text-sm font-medium">Homes</span>
              <div className="w-6 h-1 bg-rose-500 mt-1 rounded-full"></div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            {user ? (
              <Link to="/dashboard">
                <div className="w-10 h-10 rounded-full border-2 border-rose-500 bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-lg">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90"
              >
                Login
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden rounded-full hover:bg-gray-100"
            >
              <FaBars size={18} className="text-gray-700" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <Link
              to="/home"
              className="text-sm font-medium text-gray-700 hover:text-rose-500 block"
            >
              Homes
            </Link>
          </div>
        )}

        {/* Search Bar */}
        <div className="mt-6 mb-4">
          <div className="bg-white border border-gray-200 shadow-xl rounded-2xl p-4 md:p-6 flex flex-wrap gap-4 justify-between items-center">
            {/* Location */}
            <div className="flex items-center gap-2 flex-1 basis-[180px] sm:basis-[160px]">
              <FaMapMarkerAlt className="text-rose-500" />
              <div className="w-full">
                <label className="text-xs font-semibold text-gray-500">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Where to?"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="flex items-center gap-2 flex-1 basis-[140px]">
              <FaCalendarAlt className="text-rose-500" />
              <div className="w-full">
                <label className="text-xs font-semibold text-gray-500">
                  Check-in
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full text-sm text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Check-out */}
            <div className="flex items-center gap-2 flex-1 basis-[140px]">
              <FaCalendarAlt className="text-rose-500" />
              <div className="w-full">
                <label className="text-xs font-semibold text-gray-500">
                  Check-out
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full text-sm text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-2 flex-1 basis-[120px]">
              <FaUser className="text-rose-500" />
              <div className="w-full">
                <label className="text-xs font-semibold text-gray-500">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="Add guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 flex-1 basis-[120px]">
              <span className="text-rose-500 font-bold text-lg">₹</span>
              <div className="w-full">
                <label className="text-xs font-semibold text-gray-500">
                  Max Price
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 transition-all text-white rounded-full p-3 shadow-lg"
            >
              <FaSearch size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
