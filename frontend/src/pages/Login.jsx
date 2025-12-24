import { useState } from "react";
import axios from "axios";
import hopeImg from "../assets/images/hope.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 🔥 VERY IMPORTANT

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert(res.data.message);

      // save user (later use)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/"); // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full grid md:grid-cols-2 overflow-hidden">

        {/* IMAGE */}
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
              Share Food, Share Hope
            </h2>
          </div>
        </div>

        {/* FORM */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-orange-600 mb-2 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>

          <p className="text-center mt-6">
            Don’t have an account?{" "}
            <a href="/signup" className="text-orange-600 font-semibold">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
