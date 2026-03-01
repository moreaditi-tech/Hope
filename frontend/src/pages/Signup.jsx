import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import hopeImg from "../assets/images/hope.jpg";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Donor",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

        {/* IMAGE SECTION */}
        <div
          className="hidden md:flex items-center justify-center"
          style={{
            backgroundImage: `url(${hopeImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/40 w-full h-full flex items-center justify-center">
            <h2 className="text-white text-3xl font-bold text-center px-6">
              Join HOPE
            </h2>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-2 text-center">
            Create Account
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Be a donor or a receiver. Together we reduce hunger.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Register As</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3 border rounded mb-3"
              >
                <option value="donor">Donor</option>
                <option value="receiver">Receiver</option>
                <option value="volunteer">Volunteer 🚚</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-orange-600 font-semibold">
              Login
            </a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;
