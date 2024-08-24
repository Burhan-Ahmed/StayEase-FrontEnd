import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UNSPLASH_ACCESS_KEY = 'GaJSLYrNZMrMkDM_D200bscJ8vsHWTZnnBA-BNpC24E';
const query = 'hotel';

export default function RoomsList() {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [images, setImages] = useState([]);
    const [visibleRooms, setVisibleRooms] = useState(9);

    const loadMoreRooms = () => {
        setVisibleRooms(prevVisibleRooms => prevVisibleRooms + 12);
    };

    useEffect(() => {
        axios.get('https://marsh-enchanting-split.glitch.me/api/ViewRoom')
            .then(response => {
                console.log('Rooms Data:', response.data);
                setRooms(response.data);
            })
            .catch(error => {
                console.error('Error fetching rooms:', error);
            });
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    params: {
                        query: query,
                        per_page: 20,
                        page: 1,
                    },
                    headers: {
                        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                    },
                });

                const landscapeImages = response.data.results.filter(image => image.width > image.height);
                setImages(landscapeImages);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, [query]);

    const availableRooms = rooms.filter(room => room.Status === 'Available');

    return (
        <div className="font-poppins container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Available Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {availableRooms.slice(0, visibleRooms).map((room, index) => {
                    const image = images[index % images.length];

                    return (
                        <div key={room._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="relative">
                                {image && (
                                    <img
                                        src={image.urls.small}
                                        alt={image.alt_description}
                                        className="w-full h-auto object-cover"
                                    />
                                )}
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                    {room.RoomNumber} - {room.RoomType}
                                </h2>
                                <p className="text-gray-600 mb-4">{room.Description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-medium text-gray-900">Price: ${room.Price}</span>
                                    <span className={`px-3 py-1 rounded-full text-sm ${room.Status === 'Available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {room.Status}
                                    </span>
                                </div>
                                <a
                                    href={`/payment/${room._id}?roomNumber=${room.RoomNumber}&imageUrl=${encodeURIComponent(image.urls.small)}`}
                                    className="inline-block px-4 py-2 bg-blue-900 hover:bg-black text-white rounded-lg transition"
                                >
                                    Book Now
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
            {visibleRooms < availableRooms.length && (
                <div className="text-center mt-8">
                    <button
                        onClick={loadMoreRooms}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
