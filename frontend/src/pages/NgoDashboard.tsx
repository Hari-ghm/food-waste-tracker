import { useEffect, useState } from "react";

type Donation = {
  id: string;
  donorName: string;
  donorType: string;
  city: string;
  date: string;
  foodType: string;
  quantity: number;
};

const dummyAllDonations: Donation[] = [
  {
    id: "1",
    donorName: "Green Restaurant",
    donorType: "restaurant",
    city: "Chennai",
    date: "2025-07-27",
    foodType: "Vegetables",
    quantity: 20,
  },
  {
    id: "2",
    donorName: "Local Household",
    donorType: "household",
    city: "Chennai",
    date: "2025-07-28",
    foodType: "Rice",
    quantity: 5,
  },
  {
    id: "3",
    donorName: "Healthy Bites",
    donorType: "restaurant",
    city: "Bangalore",
    date: "2025-07-26",
    foodType: "Snacks",
    quantity: 15,
  },
];

const dummyNGODonations: Donation[] = [
  {
    id: "11",
    donorName: "Green Restaurant",
    donorType: "restaurant",
    city: "Chennai",
    date: "2025-07-20",
    foodType: "Dal",
    quantity: 10,
  },
  {
    id: "12",
    donorName: "Local Household",
    donorType: "household",
    city: "Chennai",
    date: "2025-07-22",
    foodType: "Fruits",
    quantity: 7,
  },
];

const NGODashboard = () => {
  const [cityFilter, setCityFilter] = useState("Chennai");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("desc");

  const [allDonations, setAllDonations] = useState<Donation[]>([]);
  const [ngoHistory, setNGOHistory] = useState<Donation[]>([]);

  useEffect(() => {
    // Fetch from backend instead of using dummy data in real app
    const filtered = dummyAllDonations.filter((d) => d.city === cityFilter);
    const sorted = [...filtered].sort((a, b) =>
      sortByDate === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    setAllDonations(sorted);
    setNGOHistory(dummyNGODonations); // in real case, filter by NGO ID
  }, [cityFilter, sortByDate]);

  return (
    <div className="min-h-screen bg-[#101010] text-white p-8">
      <h1 className="text-3xl font-bold text-teal-400 mb-6">NGO Dashboard</h1>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <label>
          <span className="text-gray-300 mr-2">City:</span>
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-[#1a1a1a] text-white border border-gray-600 rounded px-3 py-1"
          >
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </label>

        <label>
          <span className="text-gray-300 mr-2">Sort by Date:</span>
          <select
            value={sortByDate}
            onChange={(e) => setSortByDate(e.target.value as "asc" | "desc")}
            className="bg-[#1a1a1a] text-white border border-gray-600 rounded px-3 py-1"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </label>
      </div>

      {/* Available Donations */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-teal-300">
          Available Donations
        </h2>
        <table className="w-full text-left border-collapse bg-[#1a1a1a] rounded overflow-hidden">
          <thead>
            <tr className="bg-[#222] text-teal-300">
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Food</th>
              <th className="px-4 py-2">Qty</th>
            </tr>
          </thead>
          <tbody>
            {allDonations.map((d) => (
              <tr key={d.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{d.donorName}</td>
                <td className="px-4 py-2">{d.donorType}</td>
                <td className="px-4 py-2">{d.city}</td>
                <td className="px-4 py-2">{d.date}</td>
                <td className="px-4 py-2">{d.foodType}</td>
                <td className="px-4 py-2">{d.quantity} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Donation History */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-teal-300">
          Your Donation History
        </h2>
        <table className="w-full text-left border-collapse bg-[#1a1a1a] rounded overflow-hidden">
          <thead>
            <tr className="bg-[#222] text-teal-300">
              <th className="px-4 py-2">Donor</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">City</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Food</th>
              <th className="px-4 py-2">Qty</th>
            </tr>
          </thead>
          <tbody>
            {ngoHistory.map((d) => (
              <tr key={d.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{d.donorName}</td>
                <td className="px-4 py-2">{d.donorType}</td>
                <td className="px-4 py-2">{d.city}</td>
                <td className="px-4 py-2">{d.date}</td>
                <td className="px-4 py-2">{d.foodType}</td>
                <td className="px-4 py-2">{d.quantity} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NGODashboard;
