import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EarningsOverview({ driverId }) {
    const [earnings, setEarnings] = useState({
        daily: '$0.00',
        weekly: '$0.00',
        monthly: '$0.00',
    });

    useEffect(() => {
        console.log(`http://localhost:5000/api/driver/earnings/${driverId}`);
        // Fetch earnings overview on component mount
        axios.get(`http://localhost:5000/api/driver/earnings/${driverId}`)
            .then(response => setEarnings(response.data))
            .catch(error => console.log(error));
    }, [driverId]);

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Earnings Overview</h3>
            <ul className="space-y-2">
                <li><strong>Daily Earnings:</strong> {earnings.dailyEarnings}</li>
                <li><strong>Weekly Earnings:</strong> {earnings.weeklyEarnings}</li>
                <li><strong>Monthly Earnings:</strong> {earnings.monthlyEarnings}</li>
            </ul>
        </div>
    );
}

export default EarningsOverview;
