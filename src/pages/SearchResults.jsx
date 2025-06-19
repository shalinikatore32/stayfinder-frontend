import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import Navbar from "../components/Navbar";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract query params
  const location = searchParams.get("location") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "";
  const price = searchParams.get("price") || "";

  useEffect(() => {
    const fetchFilteredListings = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/listings/search`,
          {
            params: { location, checkIn, checkOut, guests, price },
          }
        );
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching filtered listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredListings();
  }, [location, checkIn, checkOut, guests, price]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <div className="py-10 px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Search Results{location && ` for "${location}"`}
        </h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading listings...</p>
        ) : listings.length === 0 ? (
          <p className="text-center text-gray-500">No listings found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  );
}
