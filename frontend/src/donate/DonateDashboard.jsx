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
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">
          Your Food Can Be Someone’s Smile
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Share surplus food and spread hope. Choose a category below to donate
          responsibly and make a meaningful impact.
        </p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Veg */}
        <Link
          to="/donate/veg"
          className="group bg-white rounded-2xl shadow suggest p-6 text-center transition hover:shadow-lg"
        >
          <img
            src={vegImg}
            alt="Veg food"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-orange-600 group-hover:underline">
            Add Veg Food
          </h3>
          <p className="text-gray-600 mt-2">
            Fresh vegetarian meals prepared with care.
          </p>
        </Link>

        {/* Non Veg */}
        <Link
          to="/donate/nonveg"
          className="group bg-white rounded-2xl shadow p-6 text-center transition hover:shadow-lg"
        >
          <img
            src={nonVegImg}
            alt="Non-veg food"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-orange-600 group-hover:underline">
            Add Non-Veg Food
          </h3>
          <p className="text-gray-600 mt-2">
            Nutritious non-veg food shared safely.
          </p>
        </Link>

        {/* Drinks */}
        <Link
          to="/donate/drinks"
          className="group bg-white rounded-2xl shadow p-6 text-center transition hover:shadow-lg"
        >
          <img
            src={drinksImg}
            alt="Drinks"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-orange-600 group-hover:underline">
            Add Drinks
          </h3>
          <p className="text-gray-600 mt-2">
            Water bottles, juices, and packaged drinks.
          </p>
        </Link>

        {/* Snacks */}
        <Link
          to="/donate/snacks"
          className="group bg-white rounded-2xl shadow p-6 text-center transition hover:shadow-lg"
        >
          <img
            src={snacksImg}
            alt="Snacks"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-bold text-orange-600 group-hover:underline">
            Add Snacks
          </h3>
          <p className="text-gray-600 mt-2">
            Biscuits, fruits, and light snacks.
          </p>
        </Link>

        {/* Celebration – Highlighted */}
        <Link
          to="/donate/celebration"
          className="relative bg-orange-100 border-2 border-orange-300 rounded-2xl shadow p-6 text-center md:col-span-2 transition hover:shadow-xl"
        >
          <span className="absolute top-4 right-4 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Special
          </span>

          <img
            src={celebrationImg}
            alt="Celebration"
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-2xl font-bold text-orange-700">
            Invite a Celebration
          </h3>
          <p className="text-gray-700 mt-2 max-w-xl mx-auto">
            Share surplus food from birthdays, weddings, festivals, or events
            and spread joy beyond your celebration.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default DonateDashboard;
