import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DonorMessages = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/chat/donor/${user._id}`
        );
        setChats(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load messages");
      }
    };

    fetchChats();
  }, []);

  if (!user) return <div className="p-6 text-center">Please login</div>;

  return (
    <div className="bg-orange-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-4">

        <h2 className="text-xl font-bold mb-4 text-center">My Messages</h2>

        {chats.length === 0 ? (
          <p className="text-gray-500 text-center">No chats yet</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              className="border p-3 rounded mb-3 cursor-pointer hover:bg-orange-50"
              onClick={() => navigate(`/chat/${chat.foodId._id}`)}
            >
              <p className="font-semibold">{chat.foodId.foodName}</p>
              <p className="text-sm text-gray-500">
                Receiver: {chat.receiverId?.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonorMessages;
