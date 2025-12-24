import { useState } from "react";
import axios from "axios";

const InviteCelebration = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    expectedPlates: "",
    celebrationDate: "",
    location: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/donate", {
        foodName: formData.eventName,
        quantity: formData.expectedPlates,
        expiryDate: formData.celebrationDate, // reused field
        location: formData.location,
        message: formData.message,
        category: "celebration",
      });

      alert("Celebration invitation sent successfully ");

      setFormData({
        eventName: "",
        expectedPlates: "",
        celebrationDate: "",
        location: "",
        message: "",
      });
    } catch (error) {
      alert("Something went wrong ");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Invite a Celebration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name (Birthday, Wedding)"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="expectedPlates"
            placeholder="Expected Food Plates"
            value={formData.expectedPlates}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="celebrationDate"
            value={formData.celebrationDate}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Celebration Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Extra details (time, pickup note, etc.)"
            value={formData.message}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Invite Celebration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteCelebration;
