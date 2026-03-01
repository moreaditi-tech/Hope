import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const { foodId } = useParams();
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  /* 1. FETCH FOOD DETAILS & INIT CHAT */
  useEffect(() => {
    if (!user) return;

    const initChat = async () => {
      try {
        // A. Fetch Food to get Donor ID
        const foodRes = await axios.get(`http://localhost:5000/api/donate/find/${foodId}`);
        setFood(foodRes.data);

        const donorId = foodRes.data.userId?._id || foodRes.data.userId;
        const receiverId = user._id;

        // B. Start/Get Chat Session
        const chatRes = await axios.post("http://localhost:5000/api/chat/start", {
          foodId,
          donorId,
          receiverId
        });

        setChat(chatRes.data);
      } catch (err) {
        console.error("Init chat error:", err);
        alert("Failed to load chat. Check connection.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [foodId]);

  /* 2. AUTO REFRESH MESSAGES */
  useEffect(() => {
    if (!chat) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/${foodId}`);
        setChat(res.data);
      } catch (err) {
        console.error("Refresh error:", err);
      }
    };

    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [foodId, chat?._id]); // Run only after chat is loaded

  /* SEND MESSAGE */
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/chat/send", {
        foodId,
        senderId: user._id,
        text: message,
      });

      setMessage("");
      // Immediate refresh
      const res = await axios.get(`http://localhost:5000/api/chat/${foodId}`);
      setChat(res.data);
    } catch (err) {
      console.error("Send error:", err);
      alert("Send failed");
    }
  };

  if (foodId === "undefined" || !foodId) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold text-red-500">Invalid Chat Link</h2>
        <p className="text-gray-600">The food item for this chat might have been deleted.</p>
        <button onClick={() => window.history.back()} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Go Back</button>
      </div>
    );
  }

  if (!user) return <div className="p-6 text-center">Please login first.</div>;
  if (loading) return <div className="p-6 text-center">Loading chat...</div>;

  return (
    <div className="bg-orange-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

        {/* HEADER */}
        <div className="bg-orange-500 p-4 text-white text-center">
          <h2 className="text-xl font-bold">Chat about {food?.foodName}</h2>
          <p className="text-sm opacity-90">
            With {user._id === food?.userId?._id ? "Receiver" : "Donor"}
          </p>
        </div>

        <div className="p-4">
          {/* MESSAGES */}
          <div className="h-96 overflow-y-auto border border-gray-100 rounded-lg p-4 mb-4 space-y-3 bg-gray-50">
            {!chat?.messages || chat.messages.length === 0 ? (
              <p className="text-gray-400 text-center italic mt-10">No messages yet. Say hi! 👋</p>
            ) : (
              chat.messages.map((m, i) => {
                const senderId = typeof m.sender === "object" ? m.sender._id : m.sender;
                const isMe = senderId === user._id;

                return (
                  <div
                    key={i}
                    className={`max-w-[80%] p-3 rounded-xl text-sm ${isMe
                      ? "bg-orange-500 text-white ml-auto rounded-tr-none shadow-md"
                      : "bg-white border border-gray-200 text-gray-800 mr-auto rounded-tl-none shadow-sm"
                      }`}
                  >
                    {m.text}
                  </div>
                );
              })
            )}
          </div>

          {/* INPUT */}
          <div className="flex gap-3">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-orange-700 transition-colors transform active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
