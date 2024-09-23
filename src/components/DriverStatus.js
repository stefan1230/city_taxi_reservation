import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DriverStatus({ driverId }) {
    const [status, setStatus] = useState('AVAILABLE');

    useEffect(() => {
        // Fetch driver status on component mount
        axios.get(`http://localhost:5000/api/driver/${driverId}`)
            .then(response => setStatus(response.data.driverStatus))
            .catch(error => console.log(error));
    }, [driverId]);

    const toggleStatus = () => {
        const newStatus = status === 'AVAILABLE' ? 'BUSY' : 'AVAILABLE';
        axios.put('http://localhost:5000/api/driver/status', { driverId, status: newStatus })
            .then(() => setStatus(newStatus))
            .catch(error => console.log(error));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Driver Status</h3>
            <div className="flex items-center justify-between">
                <span className={`text-${status === 'AVAILABLE' ? 'green' : 'red'}-500 font-bold`}>
                    {status}
                </span>
                <button
                    onClick={toggleStatus}
                    className="py-2 px-4 bg-indigo-600 text-white rounded-md"
                >
                    Toggle Status
                </button>
            </div>
        </div>
    );
}

export default DriverStatus;
