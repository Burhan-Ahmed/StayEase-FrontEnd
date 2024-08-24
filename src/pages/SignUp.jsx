import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {

    const url = 'http://localhost:3000'

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "", email: "", password: "", phoneNumber: "", cnic: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const setFormNull = ()=>{
        setFormData({
            name: "", email: "", password: "", phoneNumber: "", cnic: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch(`${url}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setLoading(false);
            const data = await res.json();
            console.log("data is ", data);
            if (data.success) {
                alert(data.message);
                setFormNull();
                navigate('/login');
            } else {
                alert(`error in getting data ${data.message}`);
            }
        } catch (error) {
            setLoading(false);
            console.log("error in registering", error);
        }
    }

    return (
        <>
            <div className="flex items-center justify-center mt-8">
                <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-lg w-full max-w-lg'>
                    <h1 className='text-3xl sm:text-4xl mb-4 font-semibold text-slate-700 uppercase'>Sign Up</h1>
                    <input type="text" placeholder='Name...' name="name" id="name" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <input type="email" placeholder='Email...' name="email" id="email" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <input type="number" placeholder='Phone Number...' name="phoneNumber" id="phoneNumber" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <input type="number" placeholder='Cnic...' name="cnic" id="cnic" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <input type="password" placeholder='Password...' name="password" id="password" className='p-2 border rounded-lg w-full' onChange={handleChange} required />
                    <button className='border rounded-lg p-2 bg-blue-600 w-full text-white hover:opacity-90 uppercase text-lg'>{loading ? "Loading" : "Sign Up"}</button>
                    <div>
                        <p className='text-gray-500 text-sm'>Already have an account? &nbsp;
                            <Link to='/login' className="text-blue-800 text-md hover:text-blue-900">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    );
}
