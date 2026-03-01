import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const Profile = () => {
  const [donations, setDonations] = useState([]);
  const [chats, setChats] = useState([]);
  const [reviews, setReviews] = useState([]); // NEW
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return;
    fetchMyDonations();
    fetchChats();
    fetchReviews();
  }, [user?._id]);

  // NEW FUNCTION
  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/review/${user._id}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* FETCH DONATIONS */
  const fetchMyDonations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/donate/my/${user._id}`
      );
      setDonations(res.data);
    } catch (err) {
      console.error(err);
      // Handle network errors (no response)
      const msg = err.response?.data?.message || err.message || "Failed to load donations";
      alert(`Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  /* FETCH CHATS BASED ON ROLE */
  const fetchChats = async () => {
    try {
      const endpoint =
        user.role === "Receiver"
          ? `http://localhost:5000/api/chat/receiver/${user._id}`
          : `http://localhost:5000/api/chat/donor/${user._id}`;

      const res = await axios.get(endpoint);
      setChats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* UPLOAD AVATAR */
  const handleUpload = async () => {
    if (!avatarFile) return alert("Select image first");

    const data = new FormData();
    data.append("avatar", avatarFile);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/avatar/${user._id}`,
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  if (!user) {
    return <div className="p-6 text-center">Please login first.</div>;
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          My Profile
        </h1>

        {/* AVATAR */}
        <div className="mb-6">
          {user.avatar ? (
            <img
              src={`http://localhost:5000/uploads/${user.avatar}`}
              alt="avatar"
              className="w-28 h-28 rounded-full object-cover mx-auto"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-orange-500 text-white flex items-center justify-center text-3xl font-bold mx-auto">
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}

          <input
            type="file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
            className="mt-3"
          />

          <button
            onClick={handleUpload}
            className="mt-2 bg-orange-500 text-white px-4 py-1 rounded"
          >
            Upload Photo
          </button>
        </div>

        {/* USER INFO */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <p className="text-lg"><strong>Name:</strong> {user.name} <span className="text-sm text-gray-500">({user.role || "No Role"})</span></p>
          <p className="text-lg"><strong>Email:</strong> {user.email}</p>
        </div>

      </div>

      {/* Reviews Section */}
      <div className="mt-8 mb-8 text-left bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-bold mb-4 border-b pb-2">Reviews & Reputation</h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <span className="text-4xl font-bold text-yellow-600 block">
              {user.averageRating || 0}
            </span>
            <span className="text-xs text-gray-500">Average</span>
          </div>
          <div>
            <StarRating rating={Math.round(user.averageRating || 0)} readonly />
            <p className="text-sm text-gray-500 mt-1">{user.reviewCount || 0} reviews</p>
          </div>
        </div>

        <div className="space-y-4 max-h-60 overflow-y-auto">
          {reviews.length === 0 ? (
            <p className="text-gray-500 italic">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    {review.reviewerId?.name || "User"}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <StarRating rating={review.rating} readonly />
                {review.comment && (
                  <p className="text-gray-600 mt-1 text-sm">"{review.comment}"</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* DONOR MESSAGES */}
      <h2 className="text-2xl font-semibold mb-4">
        {user.role === "Receiver"
          ? "Messages from Donors"
          : "Messages from Receivers"}
      </h2>

      {chats.length === 0 ? (
        <p className="mb-8">No messages yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {chats.map((chat) => (
            <div key={chat._id} className="bg-white p-4 rounded shadow">
              {chat.foodId ? (
                <>
                  <p><strong>Food:</strong> {chat.foodId.foodName}</p>
                  <p>
                    <strong>
                      {user.role === "Receiver" ? "Donor" : "Receiver"}:
                    </strong>{" "}
                    {user.role === "Receiver"
                      ? chat.donorId?.name
                      : chat.receiverId?.name}
                  </p>

                  <button
                    onClick={() => navigate(`/chat/${chat.foodId._id}`)}
                    className="mt-3 bg-orange-500 text-white px-4 py-1 rounded"
                  >
                    Open Chat
                  </button>
                </>
              ) : (
                <p className="text-gray-500 italic">
                  (Food item unavailable or deleted)
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* DONATIONS */}
      <h2 className="text-2xl font-semibold mb-4">My Donations</h2>

      {/* DONATIONS TABLE */}
      <h2 className="text-2xl font-semibold mb-4 mt-8">My Previous Donations</h2>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-gray-500 italic">No donations yet. Start sharing! 🍲</p>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Food Item</th>
                  <th className="px-6 py-4">Quantity</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Consume By</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {donations.map((food) => (
                  <tr
                    key={food._id}
                    className="hover:bg-orange-50 transition-colors duration-200 group"
                  >
                    {/* IMAGE & NAME */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shadow-sm border border-gray-200">
                          {food.image ? (
                            <img
                              src={`http://localhost:5000/uploads/${food.image}`}
                              alt={food.foodName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                              No Img
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
                            {food.foodName}
                          </p>
                          <span className="text-[10px] uppercase tracking-wide text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                            {food.type}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* QUANTITY */}
                    <td className="px-6 py-4 font-medium text-gray-600">
                      {food.quantity}
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      {food.ordered ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                          Claimed
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-1.5"></span>
                          Available
                        </span>
                      )}
                    </td>

                    {/* CONSUME BY */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {food.consumeBy ? (
                        <span className={`${new Date(food.consumeBy) < new Date() ? 'text-red-500 font-bold' : ''}`}>
                          {new Date(food.consumeBy).toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={async () => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this donation?"
                            )
                          ) {
                            try {
                              await axios.delete(
                                `http://localhost:5000/api/donate/${food._id}`
                              );
                              fetchMyDonations(); // Refresh list
                            } catch (err) {
                              alert("Delete failed");
                            }
                          }
                        }}
                        className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all"
                        title="Delete"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>

  );
};

export default Profile;
