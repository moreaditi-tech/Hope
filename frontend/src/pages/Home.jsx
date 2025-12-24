
const Home = () => {
  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="px-6 py-12">
        <div
          className="relative max-w-7xl mx-auto h-[420px] rounded-3xl overflow-hidden shadow-lg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="absolute inset-0 flex items-center justify-end px-10">
            <div className="text-right text-white max-w-xl">
              <h1 className="text-5xl font-bold mb-4">
                Share Food, Spread Love
              </h1>
              <p className="text-xl leading-relaxed">
                Reduce food waste and help communities in need by sharing surplus
                food responsibly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE IMAGE SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">

          {/* CARD 1 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e"
              alt="Food plates"
              className="w-full h-64 object-cover rounded-2xl shadow mb-6"
            />
            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              Reduce Food Wastage
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Every day, large quantities of nutritious and perfectly edible
              food are wasted due to overproduction, improper planning, and lack
              of distribution. At the same time, many children go to bed hungry.
              HOPE works to ensure surplus food is redirected responsibly,
              reducing waste while protecting the environment.
            </p>
          </div>

          {/* CARD 2 — FIXED IMAGE */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1504151932400-72d4384f04b3"
              alt="Children eating food"
              className="w-full h-64 object-cover rounded-2xl shadow mb-6"
            />
            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              Help the Needy
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Hunger affects not only physical health but also dignity,
              education, and emotional well-being—especially for children. By
              connecting donors with people in need, HOPE ensures timely access
              to nutritious food while restoring care, hope, and compassion in
              their lives.
            </p>
          </div>

          {/* CARD 3 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1509099836639-18ba1795216d"
              alt="Happy children"
              className="w-full h-64 object-cover rounded-2xl shadow mb-6"
            />
            <h3 className="text-2xl font-bold text-orange-600 mb-4">
              Create Impact
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Small actions can lead to powerful social change when people come
              together. Every donation made through HOPE strengthens
              communities, supports vulnerable families, and contributes to a
              future where no one is left hungry and food is valued as a shared
              responsibility.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
export default Home;
