import { Link } from "react-router-dom";

import vegImg from "../assets/images/veg.jpg";
import nonVegImg from "../assets/images/nonveg.jpg";
import drinksImg from "../assets/images/drinks.jpg";
import snacksImg from "../assets/images/snacks.jpg";
import celebrationImg from "../assets/images/celebration.jpg";

const DonateDashboard = () => {
  return (
    <div className="bg-orange-50 min-h-screen py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">
          Your Food Can Be Someone’s Smile
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Choose what you would like to donate today. Even a small contribution
          can make a big difference in someone’s life.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Veg */}
        <Link to="/donate/veg" className="bg-white rounded-2xl shadow p-8 text-center">
          <img src={vegImg} className="w-full h-40 object-cover rounded-xl mb-6" />
          <h3 className="text-xl font-bold text-orange-600 mb-2">Add Veg Food</h3>
          <p className="text-gray-600">
            Donate freshly prepared vegetarian meals with care and hygiene.
          </p>
        </Link>

        {/* Non-Veg */}
        <Link to="/donate/nonveg" className="bg-white rounded-2xl shadow p-8 text-center">
          <img src={nonVegImg} className="w-full h-40 object-cover rounded-xl mb-6" />
          <h3 className="text-xl font-bold text-orange-600 mb-2">
            Add Non-Veg Food
          </h3>
          <p className="text-gray-600">
            Share nutritious non-vegetarian food prepared safely.
          </p>
        </Link>

        {/* Drinks */}
        <Link to="/donate/drinks" className="bg-white rounded-2xl shadow p-8 text-center">
          <img src={drinksImg} className="w-full h-40 object-cover rounded-xl mb-6" />
          <h3 className="text-xl font-bold text-orange-600 mb-2">Add Drinks</h3>
          <p className="text-gray-600">
            Donate water bottles, juices, or packaged drinks.
          </p>
        </Link>

        {/* Snacks */}
        <Link to="/donate/snacks" className="bg-white rounded-2xl shadow p-8 text-center">
          <img src={snacksImg} className="w-full h-40 object-cover rounded-xl mb-6" />
          <h3 className="text-xl font-bold text-orange-600 mb-2">Add Snacks</h3>
          <p className="text-gray-600">
            Biscuits, fruits, or snacks that bring quick joy.
          </p>
        </Link>

        {/* Celebration */}
        <Link
          to="/donate/celebration"
          className="bg-white rounded-2xl shadow p-8 text-center md:col-span-2"
        >
          <img
            src={celebrationImg}
            className="w-full h-40 object-cover rounded-xl mb-6"
          />
          <h3 className="text-xl font-bold text-orange-600 mb-2">
            Invite a Celebration 
          </h3>
          <p className="text-gray-600">
            Celebrating something special? Share surplus food from your event
            and spread happiness beyond your celebration.
          </p>
        </Link>

      </div>
    </div>
  );
};

export default DonateDashboard;
