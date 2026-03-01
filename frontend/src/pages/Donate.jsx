import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ImageWithLoader from "../components/ImageWithLoader";

import vegImg from "../assets/images/veg.jpg";
import nonVegImg from "../assets/images/nonveg.jpg";
import drinksImg from "../assets/images/drinks.jpg";
import snacksImg from "../assets/images/snacks.jpg";
import celebrationImg from "../assets/images/celebration.jpg";
import { Leaf, Coffee, Drumstick, PartyPopper, Cookie } from "lucide-react";

const DonateDashboard = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".donate-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      to: "/donate/veg",
      img: vegImg,
      title: "Add Veg Food",
      desc: "Donate freshly prepared vegetarian meals with care and hygiene.",
      icon: <Leaf className="text-green-500" />,
      color: "hover:border-green-400"
    },
    {
      to: "/donate/nonveg",
      img: nonVegImg,
      title: "Add Non-Veg Food",
      desc: "Share nutritious non-vegetarian food prepared safely.",
      icon: <Drumstick className="text-red-500" />,
      color: "hover:border-red-400"
    },
    {
      to: "/donate/drinks",
      img: drinksImg,
      title: "Add Drinks",
      desc: "Donate water bottles, juices, or packaged drinks.",
      icon: <Coffee className="text-blue-500" />,
      color: "hover:border-blue-400"
    },
    {
      to: "/donate/snacks",
      img: snacksImg,
      title: "Add Snacks",
      desc: "Biscuits, fruits, or snacks that bring quick joy.",
      icon: <Cookie className="text-yellow-500" />,
      color: "hover:border-yellow-400"
    },
  ];

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-orange-50 to-white min-h-screen py-24 px-6">

      {/* Heading */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="title-text text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-4 drop-shadow-sm">
          Your Food Can Be Someone’s Smile
        </h2>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
          Choose what you would like to donate today. Even a small contribution
          can make a big difference in someone’s life.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.to}
            className={`donate-card glass-card rounded-2xl p-4 flex flex-col items-center text-center border-t-4 border-transparent ${cat.color} group`}
          >
            <div className="w-full h-40 rounded-xl overflow-hidden mb-6 relative">
              <ImageWithLoader src={cat.img} alt={cat.title} className="group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm">
                {cat.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors">
              {cat.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {cat.desc}
            </p>
          </Link>
        ))}

        {/* Celebration Card (Spans 2 cols on large screens if needed, or keeping styling consistent) */}
        {/* Actually let's make Celebration separate or full width if preferred, but for now let's add it to the grid or styling it distinctly */}
      </div>

      {/* Celebration Section Separate */}
      <div className="max-w-4xl mx-auto mt-12 donate-card">
        <Link
          to="/donate/celebration"
          className="glass-card rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 group hover:border-purple-300 border-t-4 border-transparent"
        >
          <div className="w-full md:w-1/2 h-64 rounded-2xl overflow-hidden relative">
            <ImageWithLoader src={celebrationImg} alt="Celebration" className="group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-sm">
              <PartyPopper className="text-purple-600" size={24} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
              Invite a Celebration
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Celebrating something special? Share surplus food from your event
              and spread happiness beyond your celebration.
            </p>
            <span className="inline-block bg-purple-100 text-purple-700 font-semibold px-6 py-2 rounded-full text-sm group-hover:bg-purple-600 group-hover:text-white transition-all">
              Start Organizing &rarr;
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DonateDashboard;
