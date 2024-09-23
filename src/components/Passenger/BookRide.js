import React, { useState } from 'react';
import axios from 'axios';

function BookRide({ passengerId }) {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [driverId, setDriverId] = useState('');
    const [fare, setFare] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/passenger/book', {
                passengerId,
                driverId,
                pickupLocation,
                destination,
                fare,
            });

            setSuccess('Ride booked successfully!');
            setPickupLocation('');
            setDestination('');
            setDriverId('');
            setFare('');
        } catch (error) {
            console.error('Error booking ride:', error);
            setSuccess('');
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Book a Ride</h3>
            {success && (
                <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                        Pickup Location
                    </label>
                    <input
                        type="text"
                        id="pickupLocation"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter pickup location"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                        Destination
                    </label>
                    <input
                        type="text"
                        id="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter destination"
                        required
                    />
                </div>

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
                    <label htmlFor="fare" className="block text-sm font-medium text-gray-700">
                        Fare
                    </label>
                    <input
                        type="number"
                        id="fare"
                        value={fare}
                        onChange={(e) => setFare(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter fare"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                >
                    Book Ride
                </button>
            </form>
        </div>
    );
}

export default BookRide;
