import { useState } from "react";
import axios from "axios";

const AddVeg = () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/donate", {
        foodName,
        quantity,
        expiryDate,
        location,
        message,
        category: "veg", // 🔥 REQUIRED BY BACKEND
      });

      alert("Food donated successfully ");

      // clear form
      setFoodName("");
      setQuantity("");
      setExpiryDate("");
      setLocation("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Something went wrong ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Add Vegetarian Food
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:outline-orange-500"
          />

          <input
            type="number"
            placeholder="Quantity (plates)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:outline-orange-500"
          />

          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:outline-orange-500"
          />

          <input
            type="text"
            placeholder="Pickup Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:outline-orange-500"
          />

          <textarea
            rows="4"
            placeholder="Message for receiver (fresh, homemade, etc.)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-3 focus:outline-orange-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Donation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVeg;

