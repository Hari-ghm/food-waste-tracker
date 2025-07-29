import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Donation {
  id: number;
  food_name: string;
  quantity: number;
  food_type: string;
  avg_food_per_person: number;
  waste_reason: string;
  notes: string;
  donated_by: number;
}

const RestaurantDashboard: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const numericUserId = parseInt(userId || "0");

  const [form, setForm] = useState({
    food_name: "",
    quantity: 1,
    food_type: "veg",
    avg_food_per_person: 1,
    waste_reason: "",
    notes: "",
  });

  const [history, setHistory] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/donate/${numericUserId}`
        );
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      }
    };

    if (numericUserId) fetchDonations();
  }, [numericUserId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/donate/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          donated_by: numericUserId,
        }),
      });

      if (!res.ok) throw new Error("Failed to submit donation");

      const newDonation = await res.json();
      setHistory((prev) => [newDonation, ...prev]);
      setForm({
        food_name: "",
        quantity: 1,
        food_type: "veg",
        avg_food_per_person: 1,
        waste_reason: "",
        notes: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Restaurant Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 p-4 rounded"
      >
        <input
          type="text"
          placeholder="Food Name"
          value={form.food_name}
          onChange={(e) => setForm({ ...form, food_name: e.target.value })}
          className="w-full p-2 border"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
          className="w-full p-2 border"
          required
        />
        <select
          value={form.food_type}
          onChange={(e) => setForm({ ...form, food_type: e.target.value })}
          className="w-full p-2 border"
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
        <input
          type="number"
          placeholder="Avg. Food per Person"
          value={form.avg_food_per_person}
          onChange={(e) =>
            setForm({ ...form, avg_food_per_person: +e.target.value })
          }
          className="w-full p-2 border"
          required
        />
        <input
          type="text"
          placeholder="Reason for Waste"
          value={form.waste_reason}
          onChange={(e) => setForm({ ...form, waste_reason: e.target.value })}
          className="w-full p-2 border"
        />
        <textarea
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="w-full p-2 border"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Donation
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-2">Donation History</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">Food</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Avg/Person</th>
            <th className="border px-2 py-1">Reason</th>
            <th className="border px-2 py-1">Notes</th>
          </tr>
        </thead>
        <tbody>
          {history.map((d) => (
            <tr key={d.id}>
              <td className="border px-2 py-1">{d.food_name}</td>
              <td className="border px-2 py-1">{d.quantity}</td>
              <td className="border px-2 py-1">{d.food_type}</td>
              <td className="border px-2 py-1">{d.avg_food_per_person}</td>
              <td className="border px-2 py-1">{d.waste_reason}</td>
              <td className="border px-2 py-1">{d.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantDashboard;
