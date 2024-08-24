import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoomInformation = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('https://acoustic-elastic-wildflower.glitch.me/rooms');
                console.log('Response:', response.data);
                setRooms(response.data.rooms);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching rooms:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) return <p className="text-center mt-4 text-white">Loading...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">Error: {error}</p>;

    const bookedRooms = rooms.filter(room => room.status === 'booked');
    const availableRooms = rooms.filter(room => room.status === 'available');

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-100 min-h-screen font-poppins">
            <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Room Information</h2>

            <div className="mb-8">
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Booked Rooms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bookedRooms.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">No booked rooms available.</p>
                    ) : (
                        bookedRooms.map(room => (
                            <div key={room._id} className="p-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <h4 className="font-semibold text-xl text-gray-900 mb-2">Room Number</h4>
                                <p className="text-gray-800 mb-4">{room.number}</p>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">Type</h4>
                                <p className="text-gray-700 mb-4">{room.type}</p>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">Booking Date</h4>
                                <p className="text-gray-700 mb-4">{new Date(room.bookingDate).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">Available Rooms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {availableRooms.length === 0 ? (
                        <p className="text-center text-gray-500 col-span-full">No available rooms at the moment.</p>
                    ) : (
                        availableRooms.map(room => (
                            <div key={room._id} className="p-6 bg-white text-gray-800 border border-gray-300 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                                <h4 className="font-semibold text-xl text-gray-900 mb-2">Room Number</h4>
                                <p className="text-gray-800 mb-4">{room.number}</p>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">Type</h4>
                                <p className="text-gray-700 mb-4">{room.type}</p>
                                <h4 className="font-semibold text-lg text-gray-900 mb-2">Available Since</h4>
                                <p className="text-gray-700 mb-4">{new Date(room.availableSince).toLocaleDateString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomInformation;
