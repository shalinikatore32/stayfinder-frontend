import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (fetchedOnce.current) return;
    fetchedOnce.current = true;

    const fetchListings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/listings`
        );
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const renderSkeletonCard = () => (
    <div className="rounded-xl bg-white shadow-md p-3 animate-pulse space-y-2">
      <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
      <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
      <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="py-10 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
          StayFinder - Explore Beautiful Stays
        </h1>

        <div className="min-h-[300px]">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>{renderSkeletonCard()}</div>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <p className="text-center text-gray-500">No listings available</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 transition-all duration-300">
              {listings.map((listing) => (
                <PropertyCard
                  key={listing._id}
                  id={listing._id}
                  image={listing.image}
                  title={listing.title}
                  price={`₹${listing.pricePerNight}/night`}
                  location={listing.location}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
