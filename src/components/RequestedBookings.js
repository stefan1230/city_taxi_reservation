import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RequestedBookings({ driverId }) {
    const [bookings, setBookings] = useState([]);

    // Fetch requested bookings for the driver
    useEffect(() => {
        const fetchRequestedBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/driver/requested-bookings/${driverId}`);
                setBookings(response.data);
            } catch (error) {
                console.error('Error fetching requested bookings:', error);
            }
        };

        fetchRequestedBookings();
    }, [driverId]);

    // Handle accepting the ride
    const handleAcceptBooking = async (bookingId) => {
        try {
            await axios.put(`http://localhost:5000/api/driver/accept-booking/${bookingId}`);
            // Update the bookings list to remove the confirmed one
            setBookings((prevBookings) => prevBookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Requested Rides</h3>
            {bookings.length === 0 ? (
                <p>No requested rides at the moment.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking.id} className="mb-4 border-b pb-4">
                            <p><strong>Passenger:</strong> {booking.passenger.name}</p>
                            <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
                            <p><strong>Destination:</strong> {booking.destination}</p>
                            <button
                                onClick={() => handleAcceptBooking(booking.id)}
                                className="mt-2 py-2 px-4 bg-green-600 text-white rounded-md"
                            >
                                Accept Ride
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RequestedBookings;
