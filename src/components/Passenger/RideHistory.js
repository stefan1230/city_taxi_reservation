import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RideHistory({ passengerId }) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/passenger/history/${passengerId}`)
            .then(response => setHistory(response.data.rideHistory))
            .catch(error => console.log(error));
    }, [passengerId]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Ride History</h3>
            {history.length === 0 ? (
                <p>No ride history</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((ride) => (
                        <li key={ride.id} className="p-4 bg-gray-100 rounded-md">
                            <p><strong>Driver:</strong> {ride.driver.name}</p>
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
