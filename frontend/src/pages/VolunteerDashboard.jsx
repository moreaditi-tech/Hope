import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const VolunteerDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/volunteer/tasks");
            setTasks(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAcceptTask = (taskId) => {
        // For now, just a simulation
        alert(`Accepted task ${taskId}. Please proceed to pickup location.`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Volunteer Dashboard 🚚</h1>
                <p className="text-gray-600 mb-8">Hello {user?.name}, here are the available food pickup tasks near you.</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                            {task.image && (
                                <img
                                    src={`http://localhost:5000/uploads/${task.image}`}
                                    alt={task.foodName}
                                    className="w-full h-48 object-cover"
                                />
                            )}
                            <div className="p-5">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-800">{task.foodName}</h3>
                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                                        {task.type}
                                    </span>
                                </div>

                                <p className="text-gray-500 text-sm mt-1">Donating User: {task.userId?.name || "Unknown"}</p>
                                <div className="mt-3 text-sm text-gray-600">
                                    <p>📍 {task.location}</p>
                                    <p>⏰ Cooked: {task.cookedTime}</p>
                                </div>

                                {task.latitude && task.longitude && (
                                    <div className="h-32 mt-3 rounded-lg overflow-hidden relative z-0">
                                        <MapComponent
                                            lat={task.latitude}
                                            lng={task.longitude}
                                            popupText={task.location}
                                        />
                                    </div>
                                )}

                                <button
                                    onClick={() => handleAcceptTask(task._id)}
                                    className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Accept Pickup Task
                                </button>
                            </div>
                        </div>
                    ))}

                    {tasks.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center py-10">No active tasks available right now.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VolunteerDashboard;
