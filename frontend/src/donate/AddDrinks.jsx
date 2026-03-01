import { useState } from "react";
import axios from "axios";

const AddDrinks = () => {
  const [formData, setFormData] = useState({
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

  const user = JSON.parse(localStorage.getItem("user")); // important

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("foodName", formData.foodName);
      data.append("quantity", formData.quantity);
      data.append("expiryDate", formData.expiryDate);
      data.append("location", formData.location);
      data.append("message", formData.message);
      data.append("cookedTime", formData.cookedTime);
      data.append("consumeBy", formData.consumeBy);
      data.append("allergens", formData.allergens);
      data.append("latitude", formData.latitude);
      data.append("longitude", formData.longitude);
      data.append("type", "drinks");        // important change
      data.append("userId", user._id);      // very important
      if (image) data.append("image", image);

      await axios.post("http://localhost:5000/api/donate", data);

      alert("Drinks donated successfully");

      setFormData({
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
          Add Drinks
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="foodName"
            placeholder="Drink Name"
            value={formData.foodName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            placeholder="Expiry Date"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Prepared/Opened
              </label>
              <input
                name="cookedTime"
                type="datetime-local"
                value={formData.cookedTime}
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
                value={formData.consumeBy}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>

          <input
            name="allergens"
            value={formData.allergens}
            onChange={handleChange}
            placeholder="Allergens (e.g. Dairy, Sugar)"
            className="w-full border rounded-lg p-3"
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="location"
              placeholder="Pickup Location (Address)"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
              required
            />
            <button
              type="button"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      setFormData({
                        ...formData,
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
          {formData.latitude && (
            <p className="text-xs text-green-600 mt-1">
              ✅ GPS Coordinates Attached
            </p>
          )}

          <textarea
            rows="4"
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
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

export default AddDrinks;
