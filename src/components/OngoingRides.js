import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OngoingRides({ driverId }) {
    const [ongoingRides, setOngoingRides] = useState([]);

    // Fetch ongoing rides for the driver when the component loads
    useEffect(() => {
        const fetchOngoingRides = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/driver/ongoing-bookings/${driverId}`);
                setOngoingRides(response.data);
            } catch (error) {
                console.error('Error fetching ongoing rides:', error);
            }
        };

        fetchOngoingRides();
    }, [driverId]);

    // Mark the ride as completed
    const handleCompleteRide = async (bookingId) => {
        try {
            await axios.put(`http://localhost:5000/api/driver/complete-booking/${bookingId}`);
            // Remove the completed ride from the ongoing list
            setOngoingRides(ongoingRides.filter(ride => ride.id !== bookingId));
        } catch (error) {
            console.error('Error completing ride:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Ongoing Rides</h3>
            {ongoingRides.length === 0 ? (
                <p>No ongoing rides at the moment.</p>
            ) : (
                <ul>
                    {ongoingRides.map((ride) => (
                        <li key={ride.id} className="mb-4 border-b pb-4">
                            <p><strong>Passenger:</strong> {ride.passenger.name}</p>
                            <p><strong>Pickup Location:</strong> {ride.pickupLocation}</p>
                            <p><strong>Destination:</strong> {ride.destination}</p>
                            <p><strong>Fare:</strong> LKR {ride.fare}</p>
                            <button
                                onClick={() => handleCompleteRide(ride.id)}
                                className="mt-2 py-2 px-4 bg-green-600 text-white rounded-md"
                            >
                                Complete Ride
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default OngoingRides;
