import React, { useEffect, useState } from 'react';
import DriverStatus from '../components/DriverStatus';
import UpcomingRides from '../components/UpcomingRides';
import RideHistory from '../components/RideHistory';
import EarningsOverview from '../components/EarningsOverview';

function DriverDashboard() {
    const [driverId, setDriverId] = useState(null);

    useEffect(() => {
        // Retrieve driverId from localStorage
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');

        if (role !== 'driver') {
            // Handle non-driver trying to access driver dashboard (e.g., redirect)
            console.error('Access denied: Not a driver');
        } else {
            setDriverId(id);
        }
    }, []);

    // Don't render the dashboard until driverId is available
    if (!driverId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-8">Driver Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DriverStatus driverId={driverId} />
                <UpcomingRides driverId={driverId} />
                <RideHistory driverId={driverId} />
                <EarningsOverview driverId={driverId} />
            </div>
        </div>
    );
}

export default DriverDashboard;
