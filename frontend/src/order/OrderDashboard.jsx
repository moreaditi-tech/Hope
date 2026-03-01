import { useEffect, useState } from "react";
import axios from "axios";

const OrderDashboard = () => {
  const [food, setFood] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    const res = await axios.get("http://localhost:5000/api/order");
    setFood(res.data);
  };

  const orderFood = async (id) => {
    await axios.post(`http://localhost:5000/api/order/${id}`);
    alert("Food ordered successfully ");
    fetchFood();
  };

  const filteredFood =
    filter === "all" ? food : food.filter((f) => f.type === filter);

  return (
    <div className="min-h-screen bg-orange-50 p-10">
      <h2 className="text-4xl font-bold text-orange-600 text-center mb-8">
        Available Food
      </h2>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-8">
        {["all", "veg", "nonveg", "drinks", "snacks"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* FOOD LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredFood.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow p-6"
          >
            <h3 className="text-xl font-bold text-orange-600">
              {item.foodName}
            </h3>
            <p>Quantity: {item.quantity}</p>
            <p>Location: {item.location}</p>
            <p className="text-sm text-gray-600">{item.message}</p>

            <button
              onClick={() => orderFood(item._id)}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Order Food
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDashboard;
