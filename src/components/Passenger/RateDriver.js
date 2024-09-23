import React, { useState } from 'react';
import axios from 'axios';

function RateDriver({ passengerId }) {
    const [driverId, setDriverId] = useState('');
    const [rating, setRating] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/passenger/rate', {
                passengerId,
                driverId,
                rating,
            });
            setSuccess('Rating submitted successfully!');
            setDriverId('');
            setRating('');
        } catch (error) {
            console.error('Error submitting rating:', error);
            setSuccess('');
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Rate a Driver</h3>
            {success && (
                <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="driverId" className="block text-sm font-medium text-gray-700">
                        Driver ID
                    </label>
                    <input
                        type="text"
                        id="driverId"
                        value={driverId}
                        onChange={(e) => setDriverId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter driver ID"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        min="1"
                        max="5"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                >
                    Submit Rating
                </button>
            </form>
        </div>
    );
}

export default RateDriver;
