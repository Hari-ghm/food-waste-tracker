import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white flex justify-between items-center">
      <div className="text-xl font-bold">Food Waste Tracker</div>
      <div className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link to="/about" className="hover:text-yellow-400">
          About
        </Link>
        <Link to="/login" className="hover:text-yellow-400">
          Sign In
        </Link>
        <Link to="/signup" className="hover:text-yellow-400">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
