import { useState, useEffect } from "react";

const NotificationToast = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000); // auto close after 5s

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed top-5 right-5 bg-white border border-orange-200 shadow-xl rounded-lg p-4 flex items-center gap-3 z-50 animate-slide-in">
            <div className="bg-orange-100 p-2 rounded-full">
                🔔
            </div>
            <div>
                <h4 className="font-bold text-gray-800">New Notification</h4>
                <p className="text-sm text-gray-600">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-gray-400 hover:text-gray-600"
            >
                ✖
            </button>
        </div>
    );
};

export default NotificationToast;
