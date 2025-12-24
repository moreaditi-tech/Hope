import { useEffect, useState } from "react";
import axios from "axios";

const Celebration = () => {
  const [celebrations, setCelebrations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/donate")
      .then((res) => {
        const celebrationData = res.data.filter(
          (item) => item.category === "celebration"
        );
        setCelebrations(celebrationData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-orange-50 min-h-screen py-20 px-6">
      <h2 className="text-3xl font-bold text-orange-600 text-center mb-10">
        Celebration Food Available
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {celebrations.length === 0 ? (
          <p className="text-center text-gray-500">
            No celebration food available
          </p>
        ) : (
          celebrations.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <h3 className="text-xl font-semibold">
                {item.foodName || "Celebration Food"}
              </h3>

              <p>Quantity: {item.quantity}</p>
              <p>Location: {item.location}</p>

              {item.description && (
                <p className="text-gray-600 mt-1">
                  {item.description}
                </p>
              )}

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

export default Celebration;
