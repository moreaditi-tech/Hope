import { useNavigate } from "react-router-dom";

import vegImg from "../assets/images/veg.jpg";
import nonVegImg from "../assets/images/nonveg.jpg";
import drinksImg from "../assets/images/drinks.jpg";
import snacksImg from "../assets/images/snacks.jpg";
import celebrationImg from "../assets/images/celebration.jpg";

const Order = () => {
  const navigate = useNavigate();

  const Card = ({ img, title, desc, path }) => (
    <div
      onClick={() => navigate(path)}
      className="bg-white rounded-2xl shadow p-8 text-center cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={img}
        alt={title}
        className="w-full h-40 object-cover rounded-xl mb-6"
      />
      <h3 className="text-xl font-bold text-orange-600 mb-2">
        {title}
      </h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );

  return (
    <div className="bg-orange-50 min-h-screen py-20 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">
          Available Food
        </h2>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Browse available food shared by generous donors.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <Card
          img={vegImg}
          title="Veg Food"
          desc="Nutritious vegetarian meals prepared with care."
          path="/order/veg"
        />

        <Card
          img={nonVegImg}
          title="Non-Veg Food"
          desc="Protein-rich meals shared responsibly."
          path="/order/nonveg"
        />

        <Card
          img={drinksImg}
          title="Drinks"
          desc="Water bottles, juices, and refreshing drinks."
          path="/order/drinks"
        />

        <Card
          img={snacksImg}
          title="Snacks"
          desc="Light snacks to bring comfort and energy."
          path="/order/snacks"
        />

        <Card
          img={celebrationImg}
          title="Celebration"
          desc="Birthday, marriage, functions & bulk food."
          path="/order/celebration"
        />
      </div>
    </div>
  );
};

export default Order;
