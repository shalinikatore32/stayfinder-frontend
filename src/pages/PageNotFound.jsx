import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-extrabold text-rose-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved. Please
        check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-rose-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
