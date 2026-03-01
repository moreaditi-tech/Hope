import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ImageWithLoader from "../components/ImageWithLoader";
import { ArrowRight, Utensils, Coffee, Pizza, PartyPopper } from "lucide-react";

import vegImg from "../assets/images/veg.jpg";
import nonVegImg from "../assets/images/nonveg.jpg";
import drinksImg from "../assets/images/drinks.jpg";
import snacksImg from "../assets/images/snacks.jpg";
import celebrationImg from "../assets/images/celebration.jpg";

const Order = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".order-card",
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      path: "/order/veg",
      img: vegImg,
      title: "Veg Food",
      desc: "Nutritious vegetarian meals prepared with care.",
      icon: <Utensils className="text-green-500" />,
      tag: "Healthy"
    },
    {
      path: "/order/nonveg",
      img: nonVegImg,
      title: "Non-Veg Food",
      desc: "Protein-rich meals shared responsibly.",
      icon: <Utensils className="text-red-500" />,
      tag: "Protein"
    },
    {
      path: "/order/drinks",
      img: drinksImg,
      title: "Drinks",
      desc: "Water bottles, juices, and refreshing drinks.",
      icon: <Coffee className="text-blue-500" />,
      tag: "Refresh"
    },
    {
      path: "/order/snacks",
      img: snacksImg,
      title: "Snacks",
      desc: "Light snacks to bring comfort and energy.",
      icon: <Pizza className="text-yellow-500" />,
      tag: "Light"
    },
    {
      path: "/order/celebration",
      img: celebrationImg,
      title: "Celebration",
      desc: "Birthday, marriage, functions & bulk food.",
      icon: <PartyPopper className="text-purple-500" />,
      tag: "Events"
    },
  ];

  return (
    <div ref={containerRef} className="bg-gradient-to-br from-orange-50 to-white min-h-screen py-24 px-6">

      {/* Heading */}
      <div className="text-center mb-16 space-y-4">
        <h2 className="title-text text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-500 mb-4 drop-shadow-sm">
          Available Food
        </h2>
        <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
          Browse available food shared by generous donors.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            onClick={() => navigate(cat.path)}
            className="order-card glass-card rounded-2xl p-4 cursor-pointer group relative overflow-hidden"
          >
            {/* Tag */}
            <span className="absolute top-4 right-4 bg-white/90 glass px-3 py-1 rounded-full text-xs font-bold text-gray-600 z-10 shadow-sm">
              {cat.tag}
            </span>

            <div className="w-full h-48 rounded-xl overflow-hidden mb-6 relative">
              <ImageWithLoader
                src={cat.img}
                alt={cat.title}
                className="group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>

            <div className="flex items-start justify-between px-2">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-orange-600 transition-colors flex items-center gap-2">
                  {cat.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>
              <div className="mt-1 bg-gray-50 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                {cat.icon}
              </div>
            </div>

            <div className="px-2 pb-2">
              <button className="w-full py-3 rounded-lg border border-orange-200 text-orange-600 font-semibold text-sm group-hover:bg-orange-500 group-hover:text-white transition-all flex items-center justify-center gap-2">
                View Items <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
