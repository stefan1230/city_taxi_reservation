import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RideHistory({ driverId }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        // Fetch ride history on component mount
        axios.get(`http://localhost:5000/api/driver/history/${driverId}`)
            .then(response => setHistory(response.data.rideHistory))
            .catch(error => console.log(error));
    }, [driverId]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Ride History</h3>
            {history.length === 0 ? (
                <p>No ride history</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((ride) => (
                        <li key={ride.id} className="p-4 bg-gray-100 rounded-md">
                            <p><strong>Passenger:</strong> {ride.passenger.name}</p>
                            <p><strong>Date:</strong> {new Date(ride.createdAt).toLocaleDateString()}</p>
                            <p><strong>Fare:</strong> {ride.fare}</p>
                            <p><strong>Status:</strong> {ride.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default RideHistory;
