import { useState } from "react";
import type { SignupFormData } from "../types"; // Adjust the path if needed

const Login = () => {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      console.log("Login successful:", data);
      alert("Login successful!");
    } catch (err: any) {
      console.error("Login error:", err.message);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1a1a] rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-gray-700">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-400">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#111] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#111] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Type</option>
              <option value="user">NGO</option>
              <option value="user">household</option>
              <option value="user">restaurant</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-[#111] text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 rounded-lg transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
