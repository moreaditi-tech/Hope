import { useState } from "react";
import axios from "axios";

const AddNonVeg = () => {
  const [form, setForm] = useState({
    foodName: "",
    quantity: "",
    expiryDate: "",
    location: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/donate", {
        ...form,
        category: "nonveg",
      });
      alert("Non-Veg food donated successfully ");
      setForm({ foodName: "", quantity: "", expiryDate: "", location: "", message: "" });
    } catch {
      alert("Something went wrong ");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6 text-center">
          Add Non-Vegetarian Food
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input name="foodName" value={form.foodName} onChange={handleChange} placeholder="Food Name" className="w-full border rounded-lg p-3" />
          <input name="quantity" value={form.quantity} onChange={handleChange} type="number" placeholder="Quantity (plates)" className="w-full border rounded-lg p-3" />
          <input name="expiryDate" value={form.expiryDate} onChange={handleChange} type="date" className="w-full border rounded-lg p-3" />
          <input name="location" value={form.location} onChange={handleChange} placeholder="Pickup Location" className="w-full border rounded-lg p-3" />
          <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Message (fresh, hygienic, etc.)" className="w-full border rounded-lg p-3" />

          <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600">
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNonVeg;
