import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import MapComponent from "../components/MapComponent";

const VegFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const tableRef = useRef(null);

  useEffect(() => {
    fetchVegFood();
    const interval = setInterval(fetchVegFood, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  // GSAP Animation when foods change
  useEffect(() => {
    if (foods.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".food-row",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
        );
      }, tableRef);
      return () => ctx.revert();
    }
  }, [foods]);

  const fetchVegFood = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donate");

      // Filter: Type=Veg AND Not Ordered AND Not Expired
      const now = new Date();
      const vegFoods = res.data.filter(
        (item) =>
          item.type === "veg" &&
          item.ordered === false &&
          (!item.consumeBy || new Date(item.consumeBy) > now)
      );

      setFoods(vegFoods);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (id) => {
    if (!user) {
      alert("Please login to order food.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/donate/order/${id}`, {
        receiverId: user._id,
      });

      alert("Order placed successfully! You can now chat with the donor in 'My Orders'.");

      // reload from backend to stay in sync
      fetchVegFood();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Order failed";
      alert(`Error: ${msg}`);
    }
  };

  return (
    <div className="min-h-screen py-24 px-6 relative">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-400 via-orange-100 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600 text-center mb-12 tracking-tight drop-shadow-sm">
          Veg Food Available <span className="text-4xl">🥗</span>
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="relative w-16 h-16">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
          </div>
        ) : foods.length === 0 ? (
          <div className="glass-card max-w-lg mx-auto p-12 text-center rounded-3xl border border-orange-100">
            <div className="text-6xl mb-6">🍃</div>
            <p className="text-gray-800 text-2xl font-bold mb-2">Fresh Out!</p>
            <p className="text-gray-500 text-lg">No veg food available right now.</p>
            <button onClick={fetchVegFood} className="mt-6 text-orange-600 font-semibold hover:underline">Check again</button>
          </div>
        ) : (
          <div className="glass-card rounded-3xl overflow-hidden border border-white/60 shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" ref={tableRef}>
                <thead>
                  <tr className="bg-orange-50/50 border-b border-orange-100/50">
                    <th className="px-8 py-6 text-orange-900 uppercase text-xs font-bold tracking-widest">Food Item</th>
                    <th className="px-8 py-6 text-orange-900 uppercase text-xs font-bold tracking-widest">Quantity</th>
                    <th className="px-8 py-6 text-orange-900 uppercase text-xs font-bold tracking-widest">Location</th>
                    <th className="px-8 py-6 text-orange-900 uppercase text-xs font-bold tracking-widest">Timings</th>
                    <th className="px-8 py-6 text-center text-orange-900 uppercase text-xs font-bold tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50/50 bg-white/40">
                  {foods.map((food) => (
                    <tr
                      key={food._id}
                      className="food-row hover:bg-white/60 transition-all duration-300 group"
                    >
                      {/* IMAGE & NAME */}
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-6">
                          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-white flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                            {food.image ? (
                              <img
                                src={`http://localhost:5000/uploads/${food.image}`}
                                alt={food.foodName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-medium">
                                No Image
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-xl tracking-tight mb-1">
                              {food.foodName}
                            </p>
                            {food.allergens && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                                ⚠️ {food.allergens}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* QUANTITY */}
                      <td className="px-8 py-6">
                        <span className="inline-block bg-white/80 border border-orange-100 px-4 py-1.5 rounded-full text-sm font-semibold text-gray-700 shadow-sm">
                          {food.quantity}
                        </span>
                      </td>

                      {/* LOCATION */}
                      <td className="px-8 py-6 text-gray-600 max-w-xs">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-gray-900 line-clamp-2">{food.location}</span>
                          {food.latitude && (
                            <a href={`https://www.google.com/maps?q=${food.latitude},${food.longitude}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                              View on Map
                            </a>
                          )}
                        </div>
                      </td>

                      {/* TIMINGS */}
                      <td className="px-8 py-6 text-sm space-y-2">
                        {food.cookedTime && (
                          <div className="flex items-center text-gray-600">
                            <span className="w-10 text-xs text-gray-400 font-bold uppercase tracking-wider">Ck:</span>
                            <span className="font-medium">
                              {new Date(food.cookedTime).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}
                        {food.consumeBy && (
                          <div className="flex items-center text-red-600">
                            <span className="w-10 text-xs text-red-400 font-bold uppercase tracking-wider">Exp:</span>
                            <span className="font-medium bg-red-50 px-2 py-0.5 rounded text-xs">
                              {new Date(food.consumeBy).toLocaleString([], {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="px-8 py-6 text-center">
                        {(food.userId?._id || food.userId) === user?._id ? (
                          <button
                            disabled
                            className="bg-gray-100 text-gray-400 border border-gray-200 px-6 py-2.5 rounded-full text-sm font-semibold cursor-not-allowed select-none"
                          >
                            My Post
                          </button>
                        ) : (
                          <button
                            onClick={() => handleOrder(food._id)}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
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
    </div>
  );
};

export default VegFood;

