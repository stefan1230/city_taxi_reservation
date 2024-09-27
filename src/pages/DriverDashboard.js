import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DriverStatus from '../components/DriverStatus';
import UpcomingRides from '../components/UpcomingRides';
import RideHistory from '../components/RideHistory';
import EarningsOverview from '../components/EarningsOverview';
import RequestedBookings from '../components/RequestedBookings';
import OngoingRides from '../components/OngoingRides';

function DriverDashboard() {
    const [driverId, setDriverId] = useState(null);
    const navigate = useNavigate();

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

    // const handleSignout = async () => {
    //     try {
    //         await axios.post('http://localhost:5000/api/auth/signout');
    //         // Remove the token from localStorage (if you were using it)
    //         localStorage.removeItem('authToken');

    //         // Redirect to login page
    //         navigate('/login');
    //     } catch (error) {
    //         console.error('Error during signout:', error);
    //     }
    // };

    const handleSignOut = () => {
        // Clear localStorage and redirect to login page
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-8">Driver Dashboard</h1>
            <button
                onClick={handleSignOut}
                className="mb-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-sm"
            >
                Sign Out
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                <DriverStatus driverId={driverId} />
                <OngoingRides driverId={driverId} />
                <UpcomingRides driverId={driverId} />
                <RideHistory driverId={driverId} />
                <EarningsOverview driverId={driverId} />
                <RequestedBookings driverId={driverId} />
            </div>
        </div>
    );
}

export default DriverDashboard;
