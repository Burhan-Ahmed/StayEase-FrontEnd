import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewsNotifications = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/message/viewmessages');
                console.log('Response:', response.data);
                setMessages(response.data.messages);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMessages();
    }, []);

    if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen font-poppins">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Notifications</h2>
            <p className="text-center text-gray-600 mb-4">General Queries via Contact Form</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 col-span-full">No messages available.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg._id} className="p-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <h3 className="font-semibold text-xl text-gray-900 mb-2">Name</h3>
                            <p className="text-gray-800 mb-4">{msg.name}</p>
                            <h4 className="font-semibold text-lg text-gray-900 mb-2">Email</h4>
                            <p className="text-gray-700 mb-4">{msg.email}</p>
                            <h4 className="font-semibold text-lg text-gray-900 mb-2">Message</h4>
                            <p className="text-gray-800 mb-4">{msg.message}</p>
                            <p className="text-gray-600 text-sm mt-2">Sent at: {new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>

    );
};

export default ReviewsNotifications;
