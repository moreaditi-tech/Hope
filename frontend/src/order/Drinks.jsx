import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import MapComponent from "../components/MapComponent";

const Drinks = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const tableRef = useRef(null);

  useEffect(() => {
    fetchDrinks();
    const interval = setInterval(fetchDrinks, 30000); // 30s poll
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation
  useEffect(() => {
    if (foods.length > 0) {
      gsap.fromTo(
        ".food-row",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [foods]);

  const fetchDrinks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donate");

      const now = new Date();
      // Type=drinks, Not ordered, Not expired
      const drinkItems = res.data.filter(
        (item) =>
          item.type === "drinks" &&
          item.ordered === false &&
          (!item.consumeBy || new Date(item.consumeBy) > now)
      );

      setFoods(drinkItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (id) => {
    if (!user) {
      alert("Please login to order drinks.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/donate/order/${id}`, {
        receiverId: user._id,
      });

      alert("Drink ordered successfully! Check 'My Orders'.");
      fetchDrinks();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Order failed";
      alert(`Error: ${msg}`);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen py-24 px-6">
      <h2 className="title-text text-3xl font-bold text-orange-600 text-center mb-10 drop-shadow-sm">
        Drinks / Juices Available 🥤
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl font-medium">No drinks available right now.</p>
          <p className="text-gray-400 mt-2">Check back later or try other categories.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/50 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" ref={tableRef}>
              <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-5">Drink Name</th>
                  <th className="px-6 py-5">Quantity</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Expiry</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white/60">
                {foods.map((food) => (
                  <tr
                    key={food._id}
                    className="food-row hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    {/* IMAGE & NAME */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-200 flex-shrink-0 relative">
                          {food.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${food.image}`}
                              alt={food.foodName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-lg">
                            {food.foodName}
                          </p>
                          {/* Optional: Check for notes/desc if needed */}
                        </div>
                      </div>
                    </td>

                    {/* QUANTITY */}
                    <td className="px-6 py-4 font-medium text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {food.quantity}
                      </span>
                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">{food.location}</span>
                        {food.latitude && (
                          <span className="text-[11px] text-blue-600 cursor-pointer hover:underline mt-1 flex items-center gap-1">
                            📍 View on Map
                          </span>
                        )}
                      </div>
                    </td>

                    {/* EXPIRY */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {food.consumeBy ? (
                        <p className="text-red-500 font-medium bg-red-50 px-2 py-0.5 rounded inline-block text-xs">
                          Exp: {new Date(food.consumeBy).toLocaleDateString()}
                        </p>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-center">
                      {(food.userId?._id || food.userId) === user?._id ? (
                        <button
                          disabled
                          className="bg-gray-200 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold cursor-not-allowed"
                        >
                          Your Post
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOrder(food._id)}
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                          Order Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Drinks;
