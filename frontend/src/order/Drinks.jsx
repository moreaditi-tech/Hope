import { useEffect, useState } from "react";
import axios from "axios";

const Drinks = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donate")
      .then((res) => {
        const drinkItems = res.data.filter(
          (item) => item.category === "drinks"
        );
        setFoods(drinkItems);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen py-20 px-6">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-10">
        Drinks Available
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {foods.length === 0 ? (
          <p className="text-center text-gray-500">
            No drinks available
          </p>
        ) : (
          foods.map((food) => (
            <div
              key={food._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold">
                {food.foodName}
              </h3>
              <p>Quantity: {food.quantity}</p>
              <p>Location: {food.location}</p>

              <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded">
                Order
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Drinks;
