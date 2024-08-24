import React, { useState } from 'react';

const RegisterRoom = () => {
  const url = 'http://localhost:3000';
  const [formData, setFormData] = useState({
    roomtype: '',
    servantName: '',
    servantContact: '',
    price: '',
    descrip: '',
    roomImage: [],
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'roomImage') {
      setFormData((prevData) => ({
        ...prevData,
        roomImage: Array.from(files),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('roomtype', formData.roomtype);
    form.append('servantName', formData.servantName);
    form.append('servantContact', formData.servantContact);
    form.append('price', formData.price);
    form.append('descrip', formData.descrip);

    if (formData.roomImage.length > 0) {
      formData.roomImage.forEach((image) => {
        form.append('roomImage', image);
      });
    }

    try {
      const response = await fetch(`${url}/admin/register-room`, {
        method: 'POST',
        body: form,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
      } else {
        setMessage(result.message || 'Error in saving room data');
      }
    } catch (error) {
      setMessage('An error occurred while saving room data');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Register New Room</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="roomtype">
              Room Type
            </label>
            <input
              type="text"
              name="roomtype"
              id="roomtype"
              placeholder="Room Type"
              value={formData.roomtype}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="servantName">
              Servant Name
            </label>
            <input
              type="text"
              name="servantName"
              id="servantName"
              placeholder="Servant Name"
              value={formData.servantName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="servantContact">
              Servant Contact
            </label>
            <input
              type="text"
              name="servantContact"
              id="servantContact"
              placeholder="Servant Contact"
              value={formData.servantContact}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="price">
              Price Per Day
            </label>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Price Per Day"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="descrip">
              Room Description
            </label>
            <textarea
              name="descrip"
              id="descrip"
              placeholder="Room Description"
              value={formData.descrip}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="roomImage">
              Room Image
              <div className='text-sm font-semibold text-red-500'>
                Multiple files can be uploaded at the same time
              </div>
            </label>
            <input
              type="file"
              name="roomImage"
              id="roomImage"
              accept="image/*"
              onChange={handleChange}
              multiple
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Register Room
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default RegisterRoom;
