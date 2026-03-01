import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating"; // Assuming you have this

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewModal, setReviewModal] = useState({ show: false, foodId: null, donorId: null });
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    useEffect(() => {
        if (user) fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/donate/myorders/${user._id}`);
            setOrders(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const submitReview = async () => {
        try {
            await axios.post("http://localhost:5000/api/review/add", {
                reviewerId: user._id,
                userId: reviewModal.donorId, // Reviewed User (Donor)
                rating,
                comment,
            });
            alert("Review submitted!");
            setReviewModal({ show: false, foodId: null, donorId: null });
            setComment("");
        } catch (error) {
            alert("Failed to submit review");
        }
    };

    if (!user) return <div className="p-10 text-center">Please login first</div>;

    return (
        <div className="min-h-screen bg-orange-50 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Claimed Food 🛍️</h1>

                {loading ? (
                    <p>Loading...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">You haven't ordered anything yet.</p>
                ) : (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-orange-100 text-orange-800 uppercase text-sm">
                                <tr>
                                    <th className="p-4">Food Item</th>
                                    <th className="p-4">Donor</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="p-4 font-semibold">{order.foodName}</td>
                                        <td className="p-4">{order.userId?.name || "Unknown"}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            {new Date(order.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 flex justify-center gap-2">
                                            <button
                                                onClick={() => navigate(`/chat/${order._id}`)}
                                                className="bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                                            >
                                                Chat
                                            </button>
                                            <button
                                                onClick={() => setReviewModal({ show: true, foodId: order._id, donorId: order.userId?._id })}
                                                className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded hover:bg-yellow-200"
                                            >
                                                Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* REVIEW MODAL */}
                {reviewModal.show && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                            <h2 className="text-xl font-bold mb-4">Rate Donor</h2>
                            <div className="flex justify-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={`text-3xl cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                                        onClick={() => setRating(star)}
                                    >★</span>
                                ))}
                            </div>
                            <textarea
                                className="w-full border p-2 rounded mb-4"
                                placeholder="Write a review..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <div className="flex justify-end gap-2">
                                <button onClick={() => setReviewModal({ show: false, foodId: null })} className="text-gray-500 px-4">Cancel</button>
                                <button onClick={submitReview} className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
