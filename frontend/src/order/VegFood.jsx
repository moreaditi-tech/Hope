import { useEffect, useState } from "react";
import axios from "axios";

const VegFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch veg food
  useEffect(() => {
    fetchVegFood();
  }, []);

  const fetchVegFood = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donate");

      // filter only veg category
      const vegFoods = res.data.filter(
        (item) => item.category === "veg"
      );

      setFoods(vegFoods);
    } catch (error) {
      console.error(error);
      alert("Failed to load veg food");
    } finally {
      setLoading(false);
    }
  };

  // Order food
  const handleOrder = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/donate/order/${id}`
      );

      alert("Order placed! Donor has been notified.");

      // update UI instantly
      setFoods((prevFoods) =>
        prevFoods.map((food) =>
          food._id === id
            ? { ...food, status: "ordered" }
            : food
        )
      );
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-20 px-6">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-10">
        Veg Food Available
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : foods.length === 0 ? (
        <p className="text-center text-gray-500">
          No veg food available
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold">
                {food.foodName}
              </h3>

              <p>Quantity: {food.quantity}</p>
              <p>Location: {food.location}</p>

              {food.description && (
                <p className="text-gray-600 mt-1">
                  {food.description}
                </p>
              )}

              {food.status === "ordered" ? (
                <button
                  disabled
                  className="mt-4 w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
                >
                  Ordered ✅
                </button>
              ) : (
                <button
                  onClick={() => handleOrder(food._id)}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
                >
                  Order
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VegFood;
