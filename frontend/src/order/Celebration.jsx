import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import MapComponent from "../components/MapComponent";

const Celebration = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const tableRef = useRef(null);

  useEffect(() => {
    fetchCelebrations();
    const interval = setInterval(fetchCelebrations, 30000);
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

  const fetchCelebrations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donate");

      const now = new Date();
      // type="celebration", not ordered, not expired
      const celebrationData = res.data.filter(
        (item) =>
          item.type === "celebration" &&
          item.ordered === false &&
          (!item.consumeBy || new Date(item.consumeBy) > now)
      );

      setFoods(celebrationData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async (id) => {
    if (!user) {
      alert("Please login to accept an invite.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/donate/order/${id}`, {
        receiverId: user._id,
      });

      alert("Accepted! Check 'My Orders' to chat with the host.");
      fetchCelebrations();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Order failed";
      alert(`Error: ${msg}`);
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen py-24 px-6">
      <h2 className="title-text text-3xl font-bold text-purple-700 text-center mb-10 drop-shadow-sm">
        Celebration Invites / Bulk Food 🎉
      </h2>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-xl font-medium">No celebration invites right now.</p>
          <p className="text-gray-400 mt-2">Check back later.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto glass-card rounded-2xl overflow-hidden border border-white/50 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" ref={tableRef}>
              <thead className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-900 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-5">Event/Food</th>
                  <th className="px-6 py-5">Quantity</th>
                  <th className="px-6 py-5">Location</th>
                  <th className="px-6 py-5">Details</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white/60">
                {foods.map((item) => (
                  <tr
                    key={item._id}
                    className="food-row hover:bg-purple-50/50 transition-colors duration-200"
                  >
                    {/* IMAGE & NAME */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm border border-gray-200 flex-shrink-0 relative">
                          {item.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${item.image}`}
                              alt={item.foodName}
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
                            {item.foodName || "Celebration"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* QUANTITY */}
                    <td className="px-6 py-4 font-medium text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {item.quantity}
                      </span>
                    </td>

                    {/* LOCATION */}
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-700">{item.location}</span>
                        {item.latitude && (
                          <span className="text-[11px] text-blue-600 cursor-pointer hover:underline mt-1 flex items-center gap-1">
                             View on Map
                          </span>
                        )}
                      </div>
                    </td>

                    {/* DETAILS */}
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs break-words">
                      {item.message ? (
                        <p className="mb-1">
                          <span className="font-semibold text-purple-700">Note:</span>{" "}
                          {item.message}
                        </p>
                      ) : (
                        <span className="text-gray-400 italic">No details</span>
                      )}

                      {/* Show Date if available */}
                      {(item.consumeBy || item.expiryDate) && (
                        <p className="text-xs text-gray-500 mt-2 border-t pt-1">
                           {new Date(item.consumeBy || item.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </td>

                    {/* ACTION */}
                    <td className="px-6 py-4 text-center">
                      {(item.userId?._id || item.userId) === user?._id ? (
                        <button
                          disabled
                          className="bg-gray-200 text-gray-400 px-5 py-2 rounded-full text-sm font-semibold cursor-not-allowed"
                        >
                          Your Event
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOrder(item._id)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                          Accept
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

export default Celebration;
