import { useParams } from "react-router-dom";

const RestaurantDashboard = () => {
  const { id } = useParams();
  return (
    <div className="text-white p-4">
      <h1>Welcome NGO User: {id}</h1>
    </div>
  );
};

export default RestaurantDashboard;
