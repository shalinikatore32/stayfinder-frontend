import { Link } from "react-router-dom";

export default function PropertyCard({ id, image, title, price, location }) {
  const fallbackImage = "https://source.unsplash.com/featured/?apartment";

  return (
    <Link
      to={`/listing/${id}`}
      aria-label={`View details for ${title}`}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform transition duration-300 group-hover:scale-105 group-hover:shadow-xl">
        <img
          src={image || fallbackImage}
          onError={(e) => (e.target.src = fallbackImage)}
          alt={title}
          className="w-full h-48 object-cover bg-gray-100 rounded-lg"
        />

        <div className="p-4 space-y-1">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{location}</p>
          <p className="text-rose-600 font-bold text-lg">{price}</p>
        </div>
      </div>
    </Link>
  );
}
