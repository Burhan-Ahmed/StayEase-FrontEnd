import '@fortawesome/fontawesome-free/css/all.min.css';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PayStrip() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const roomNumber = searchParams.get('roomNumber');
    const imageUrl = searchParams.get('imageUrl');

    useEffect(() => {
        if (stripe && elements) {
            console.log('Stripe and Elements are loaded');
        }
    }, [stripe, elements]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            toast.error('Card Element not found.');
            console.error('Card Element is not available.');
            return;
        }

        setLoading(true);

        try {
            const { error: createPaymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (createPaymentMethodError) {
                toast.error(createPaymentMethodError.message);
                setLoading(false);
                return;
            }

            const response = await fetch('https://acoustic-elastic-wildflower.glitch.me/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const paymentIntentResponse = await response.json();

            if (paymentIntentResponse.error) {
                toast.error(paymentIntentResponse.error);
                setLoading(false);
                return;
            }

            const { clientSecret } = paymentIntentResponse;
            const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);

            if (confirmError) {
                toast.error(`Payment failed: ${confirmError.message}`);
            } else {
                toast.success('Payment Successful!');
            }
        } catch (error) {
            console.error('Payment error:', error); 
            toast.error('An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="flex flex-col md:flex-row px-6 my-36 w-full h-full max-w-screen-lg mx-auto">
            <div className="md:w-2/3 w-full flex items-stretch justify-center mb-8 md:mb-0">
                <img
                    src={imageUrl || 'https://res.cloudinary.com/dpil2pczb/image/upload/v1724323849/jason-briscoe-cwr02zo0gP8-unsplash_rr6tuo.jpg'}
                    alt={`Room ${roomNumber}`}
                    className="w-full h-full object-cover shadow-2xl rounded-s-lg"
                />
            </div>

            <div className="md:w-1/3 w-full flex items-stretch justify-center shadow-2xl border border-l border-gray-200 rounded-e-lg">
                <div className="px-8 py-10 w-full max-w-md flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Room Payment</h1>
                    <h2 className="text-lg font-semibold text-center text-gray-600 mb-6">Room: {roomNumber}</h2>

                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="mb-4 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                            required
                        />

                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            className="mb-4 border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                            required
                        />

                        <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-700">
                            Card Details
                        </label>
                        <CardElement
                            className="border border-gray-300 p-3 rounded-lg mb-4"
                        />

                        <button
                            type="submit"
                            disabled={!stripe || loading}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                        >
                            <i className="fab fa-stripe" />
                            <span className="ml-2">{loading ? 'Processing...' : 'Pay Now'}</span>
                        </button>
                    </form>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}
