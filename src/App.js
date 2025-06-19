import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListingDetail from "./pages/ListingDetail";
import LandingPage from "./pages/LandingPage";
import SearchResults from "./pages/SearchResults";
import BookingSuccess from "./pages/BookingSuccess";
import ProfilePage from "./pages/ProfilePage";
import DashboardLayout from "./pages/DashboardLayout";
import Profile from "./pages/ProfilePage";
import Bookings from "./pages/Bookings";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/booking-success" element={<BookingSuccess />} />

          {/* ✅ Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
