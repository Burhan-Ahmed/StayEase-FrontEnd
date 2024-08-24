import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function LandingPage() {
    const navigate = useNavigate()
    const handleBookNowClick = () => {
        navigate('/Rooms')
    }

    const videoUrls = [
        'https://res.cloudinary.com/dpil2pczb/video/upload/v1724272826/hanldqpuepdakqh46f43.mp4',
        'https://res.cloudinary.com/dpil2pczb/video/upload/v1724273163/5138022-uhd_4096_2160_25fps_t7xhic.mp4',
        'https://res.cloudinary.com/dpil2pczb/video/upload/v1724274564/4880316-uhd_3840_2160_25fps_c8kdyx.mp4',
        'https://res.cloudinary.com/dpil2pczb/video/upload/v1724274603/5784035-hd_1920_1080_30fps_fa0iss.mp4'
    ];
    const ImageUrl = [
        'https://res.cloudinary.com/dpil2pczb/image/upload/v1724521918/jesse-gardner-OwWbUOIbhDY-unsplash_mvxv7h.jpg',
        'https://res.cloudinary.com/dpil2pczb/image/upload/v1724521916/christin-hume-0MoF-Fe0w0A-unsplash_okmi6a.jpg',
        'https://res.cloudinary.com/dpil2pczb/image/upload/v1724521917/andrey-yachmenov-0-WxA37EXV0-unsplash_pao0q6.jpg'
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleVideoEnd = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoUrls.length);
            setIsTransitioning(false);
        }, 1000);
    };

    return (
        <div className="bg-gray-100 min-h-screen font-poppins">
            <section className="relative h-screen overflow-hidden">
                <video
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    src={videoUrls[currentVideoIndex]}
                    title="Cloudinary Video"
                    controls
                    autoPlay
                    loop={false}
                    muted
                    onEnded={handleVideoEnd}
                >
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>


                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                    <h1 className="text-4xl md:text-6xl font-bold">
                        Welcome to Our Luxury Hotel
                    </h1>
                    <p className="text-lg md:text-2xl mt-4">
                        Experience unparalleled comfort and hospitality
                    </p>
                    <button
                        onClick={handleBookNowClick}
                        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-900 transition duration-300">

                        Book Now

                    </button>
                </div>
            </section>

            <section className="py-12 ">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Why Stay With Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <img src={ImageUrl[0]} alt="Pool" className="w-full h-64 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-4">Luxurious Pool</h3>
                            <p className="mt-2 text-gray-600">
                                Enjoy our state-of-the-art swimming pool and relax under the sun.
                            </p>
                        </div>
                        <div className="text-center">
                            <img src={ImageUrl[1]} alt="Spa" className="w-full h-64 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-4">Spa & Wellness</h3>
                            <p className="mt-2 text-gray-600">
                                Indulge in a relaxing spa treatment during your stay.
                            </p>
                        </div>
                        <div className="text-center">
                            <img src={ImageUrl[2]} alt="Room" className="w-full h-64 object-cover rounded-lg" />
                            <h3 className="text-xl font-semibold mt-4">Elegant Rooms</h3>
                            <p className="mt-2 text-gray-600">
                                Experience luxury and comfort in our beautifully designed rooms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-blue-500 text-white py-12 ">
                <div className=" mx-44  flex flex-col md:flex-row justify-between items-center px-6 space-y-8 md:space-y-0 md:space-x-8">
                    <div className="flex flex-col items-start text-left md:w-1/2">
                        <h2 className="text-3xl font-bold mb-4">Contact Info</h2>
                        <p className="mb-2">Hotel XYZ</p>
                        <p className="mb-2">1234 Beach Ave, Miami, FL</p>
                        <p className="mb-2">Email: contact@hotelxyz.com</p>
                        <p className="mb-2">Phone: +1 234 567 890</p>
                        <div className="flex space-x-4 mt-4">
                            <a href="https://www.facebook.com" target="_blank" className="hover:text-gray-300">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" className="hover:text-gray-300">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" className="hover:text-gray-300">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" className="hover:text-gray-300">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </div>
                    </div>


                    <div className="md:w-1/2">
                        <h2 className="text-3xl font-bold text-center mb-8">Get in Touch</h2>
                        <form className="max-w-lg mx-auto space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full p-3 rounded-lg text-black"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-3 rounded-lg text-black"
                                />
                            </div>
                            <div>
                                <textarea
                                    rows="4"
                                    placeholder="Your Message"
                                    className="w-full p-3 rounded-lg text-black"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-blue-600 p-3 rounded-lg hover:bg-blue-700 hover:text-white transition duration-300"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>


        </div>
    );
}
