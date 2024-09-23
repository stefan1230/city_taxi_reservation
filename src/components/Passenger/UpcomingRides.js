import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpcomingRides({ passengerId }) {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        axios.get(`/api/passenger/upcoming/${passengerId}`)
            .then(response => setRides(response.data.upcomingRides))
            .catch(error => console.log(error));
    }, [passengerId]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Upcoming Rides</h3>
            {rides.length === 0 ? (
                <p>No upcoming rides</p>
            ) : (
                <ul className="space-y-4">
                    {rides.map((ride) => (
                        <li key={ride.id} className="p-4 bg-gray-100 rounded-md">
                            <p><strong>Driver:</strong> {ride.driver.name}</p>
                            <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
                            <p><strong>Destination:</strong> {ride.destination}</p>
                            <p><strong>Fare:</strong> {ride.fare}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UpcomingRides;
