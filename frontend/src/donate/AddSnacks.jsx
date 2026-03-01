import { useState } from "react";
import axios from "axios";

const AddSnacks = () => {
  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    location: "",
    message: "",
    cookedTime: "",
    consumeBy: "",
    allergens: "",
    latitude: null,
    longitude: null,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("foodName", form.foodName);
      data.append("quantity", form.quantity);
      data.append("expiryDate", form.expiryDate);
      data.append("location", form.location);
      data.append("message", form.message);
      data.append("cookedTime", form.cookedTime);
      data.append("consumeBy", form.consumeBy);
      data.append("allergens", form.allergens);
      data.append("latitude", form.latitude);
      data.append("longitude", form.longitude);

      // correct backend fields
      data.append("type", "snacks");
      data.append("userId", user._id);

      if (image) data.append("image", image);

      await axios.post("http://localhost:5000/api/donate", data);

      alert("Snacks donated successfully");

      // reset form
      setForm({
        foodName: "",
        quantity: "",
        expiryDate: "",
        location: "",
        message: "",
        cookedTime: "",
        consumeBy: "",
        allergens: "",
      });
      setImage(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Add Snacks
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="foodName"
            value={form.foodName}
            onChange={handleChange}
            placeholder="Snack Name (Biscuits, Fruits)"
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="quantity"
            type="number"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity (Packets)"
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Expiry Date"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Manufactured/Cooked
              </label>
              <input
                name="cookedTime"
                type="datetime-local"
                value={form.cookedTime}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Best Before
              </label>
              <input
                name="consumeBy"
                type="datetime-local"
                value={form.consumeBy}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          <input
            name="allergens"
            value={form.allergens}
            onChange={handleChange}
            placeholder="Allergens (e.g. Peanuts, Gluten)"
            className="w-full border rounded-lg p-3"
          />

          <div className="flex gap-2">
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Pickup Location (Address)"
              required
              className="w-full border rounded-lg p-3"
            />
            <button
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      setForm({
                        ...form,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                      });
                      alert("Location captured! 📍");
                    },
                    (error) => {
                      alert("Error capturing location: " + error.message);
                    }
                  );
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
              title="Use Current Location"
            >
              📍
            </button>
          </div>
          {form.latitude && (
            <p className="text-xs text-green-600 mt-1">
              ✅ GPS Coordinates Attached
            </p>
          )}

          <textarea
            name="message"
            rows="4"
            value={form.message}
            onChange={handleChange}
            placeholder="Message (packed, sealed, fresh, etc.)"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg p-3"
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

export default AddSnacks;
