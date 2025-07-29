import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About"; // optional
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NgoDashboard from "./pages/NGOdashboard";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import { HouseholdDashboard } from "./pages/HouseholdDashboard";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ngo/:id" element={<NgoDashboard />} />
        <Route path="/restaurant/:id" element={<RestaurantDashboard />} />
        <Route path="/household/:id" element={<HouseholdDashboard />} />
      </Routes>
    </>
  );
}

export default App;
