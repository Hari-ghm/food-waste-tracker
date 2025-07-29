import { useState } from "react";
import type { SignupFormData } from "../types"; // Adjust path if needed
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    email: "",
    name: "",
    type: "ngo",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.message || "Signup failed"}`);
        return;
      }

      alert("Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-4">
          Sign Up
        </h2>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <select
          name="userType"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="ngo">NGO</option>
          <option value="household">Household</option>
          <option value="restaurant">Restaurant</option>
        </select>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="text"
          name="contact"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Contact Number (optional)"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address (optional)"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <input
          type="text"
          name="location"
          value={formData.city}
          onChange={handleChange}
          placeholder="Location (optional)"
          className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
        />

        <button
          type="submit"
          className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
