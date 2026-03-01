import { useState } from "react";
import axios from "axios";

const InviteCelebration = () => {
  const [form, setForm] = useState({
    eventName: "",
    expectedPlates: "",
    celebrationDate: "",
    location: "",
    message: "",
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

      // map celebration fields to backend Food schema
      data.append("foodName", form.eventName);
      data.append("quantity", form.expectedPlates);
      data.append("expiryDate", form.celebrationDate);
      data.append("location", form.location);
      data.append("message", form.message);

      // correct backend fields
      data.append("type", "celebration");
      data.append("userId", user._id);

      if (image) data.append("image", image);

      await axios.post("http://localhost:5000/api/donate", data);

      alert("Celebration invitation sent successfully");

      // reset form
      setForm({
        eventName: "",
        expectedPlates: "",
        celebrationDate: "",
        location: "",
        message: "",
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
          Invite a Celebration
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name (Birthday, Wedding)"
            value={form.eventName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="expectedPlates"
            placeholder="Expected Food Plates"
            value={form.expectedPlates}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            name="celebrationDate"
            value={form.celebrationDate}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Celebration Location"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="4"
            name="message"
            placeholder="Extra details (time, pickup note, etc.)"
            value={form.message}
            onChange={handleChange}
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
            {loading ? "Submitting..." : "Invite Celebration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InviteCelebration;
