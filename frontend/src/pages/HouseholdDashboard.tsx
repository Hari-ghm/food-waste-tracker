import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Donation } from "../types";

export const HouseholdDashboard = () => {
  const { userId } = useParams<{ userId: string }>();
  const numericUserId = parseInt(userId || "0");

  const [form, setForm] = useState<Partial<Donation>>({
    food_name: "",
    quantity: 1,
    food_type: "veg",
    avg_food_per_person: 1,
    waste_reason: "",
    notes: "",
  });
  const [history, setHistory] = useState<Donation[]>([]);

  // Fetch donation history on component mount
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
    if (userId) fetchDonations();
  }, [userId]);

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
          donated_by: parseInt(userId || "0"),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to submit donation");
      }

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Household Donation Form</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow"
      >
        <input
          type="text"
          placeholder="Food Name"
          value={form.food_name}
          onChange={(e) => setForm({ ...form, food_name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
          required
        />
        <select
          value={form.food_type}
          onChange={(e) => setForm({ ...form, food_type: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
          <option value="dry">Dry</option>
        </select>
        <input
          type="number"
          placeholder="Avg Food per Person"
          value={form.avg_food_per_person}
          onChange={(e) =>
            setForm({ ...form, avg_food_per_person: parseInt(e.target.value) })
          }
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Reason for Wastage"
          value={form.waste_reason}
          onChange={(e) => setForm({ ...form, waste_reason: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Notes (optional)"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 rounded col-span-2"
        />
        <button
          type="submit"
          className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Submit Donation
        </button>
      </form>

      <h3 className="text-xl font-semibold mt-8 mb-2">Your Donation History</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-2 py-1 border">Date</th>
              <th className="px-2 py-1 border">Food</th>
              <th className="px-2 py-1 border">Qty</th>
              <th className="px-2 py-1 border">Type</th>
              <th className="px-2 py-1 border">Avg/Person</th>
              <th className="px-2 py-1 border">Wastage Reason</th>
              <th className="px-2 py-1 border">Notes</th>
            </tr>
          </thead>
          <tbody>
            {history.map((d) => (
              <tr key={d.id} className="text-sm">
                <td className="border px-2 py-1">
                  {new Date(d.created_at).toLocaleString()}
                </td>
                <td className="border px-2 py-1">{d.food_name}</td>
                <td className="border px-2 py-1">{d.quantity} kg</td>
                <td className="border px-2 py-1">{d.food_type}</td>
                <td className="border px-2 py-1">{d.avg_food_per_person} people</td>
                <td className="border px-2 py-1">{d.waste_reason}</td>
                <td className="border px-2 py-1">{d.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
