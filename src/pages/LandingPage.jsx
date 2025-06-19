import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaStar, FaMapMarkedAlt, FaShieldAlt } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/listings`
        );
        setListings(response.data.slice(0, 3)); // show only 3 listings
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };
    fetchListings();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/home`);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-white bg-opacity-90 backdrop-blur-lg shadow-md flex justify-between items-center">
        <div className="text-3xl font-extrabold text-rose-600 tracking-tight">
          StayFinder
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-slate-700 border border-slate-300 px-5 py-2 rounded-full hover:bg-slate-100 transition font-medium"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition font-semibold"
          >
            Register
          </button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative h-[90vh] flex items-center justify-center text-white pt-24"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1950&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/30 z-0" />
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Discover Your <span className="text-rose-400">Perfect Stay</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-slate-100">
            Handpicked stays across India — comfort, charm, and convenience.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="px-8 py-3 bg-rose-500 hover:bg-rose-600 transition text-white font-semibold text-lg rounded-full shadow-lg"
          >
            Explore Listings
          </button>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-20 px-4 md:px-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-slate-800">
          Featured Stays
        </h2>

        {listings.map((item) => (
          <div
            key={item._id}
            onClick={() => handleCardClick(item._id)}
            className="rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl transition-transform transform hover:-translate-y-1 bg-white border border-slate-200"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-5">
              <h3 className="text-lg font-semibold flex justify-between items-center">
                {item.title}
                <span className="text-xl text-rose-400">&#8250;</span>
              </h3>
              <p className="text-slate-500 text-sm">{item.location}</p>
              <p className="font-medium mt-2 text-rose-600">
                ₹{item.pricePerNight} / night
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-blue-50 py-20 px-6 md:px-10 text-center">
        <h2 className="text-4xl font-bold mb-14 text-slate-800">
          Why Choose <span className="text-rose-500">StayFinder?</span>
        </h2>
        <div className="grid gap-12 md:grid-cols-3 max-w-6xl mx-auto">
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <FaStar className="text-rose-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">Top Rated</h3>
            <p className="text-slate-600">
              Thousands of happy guests rated us 4.8+ on average.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <FaMapMarkedAlt className="text-rose-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">Prime Locations</h3>
            <p className="text-slate-600">
              Access stunning destinations in the heart of every city.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white shadow hover:shadow-lg transition">
            <FaShieldAlt className="text-rose-500 text-4xl mb-4 mx-auto" />
            <h3 className="font-semibold text-xl mb-2">Safe & Secure</h3>
            <p className="text-slate-600">
              Trusted hosts, verified stays, and 24/7 support.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 text-center text-sm text-slate-600 border-t border-gray-200">
        <div className="text-lg font-bold text-rose-500 mb-2">StayFinder</div>
        <p>© {new Date().getFullYear()} StayFinder. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-6 text-sm">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
