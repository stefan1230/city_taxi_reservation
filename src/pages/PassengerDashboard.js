import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpcomingRides from '../components/Passenger/UpcomingRides';
import RideHistory from '../components/Passenger/RideHistory';
import BookRide from '../components/Passenger/BookRide';
import RateDriver from '../components/Passenger/RateDriver';

function PassengerDashboard() {
    const [passengerId, setPassengerId] = useState(null);
    const navigate = useNavigate();  // Use navigate for redirecting
    const [passengerName, setPassengerName] = useState('');

    useEffect(() => {
        // Retrieve passengerId from localStorage (or use auth system)
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');
        const name = localStorage.getItem('userName');

        if (role !== 'passenger') {
            console.error('Access denied: Not a passenger');
            navigate('/login');
        } else {
            setPassengerId(id);
            setPassengerName(name)
        }
    }, [navigate]);

    const handleSignOut = () => {
        // Clear localStorage and redirect to login page
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    // Don't render the dashboard until passengerId is available
    if (!passengerId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-8">
                Hello, {passengerName}! Welcome to your Dashboard
            </h1>
            <button
                onClick={handleSignOut}
                className="mb-4 py-2 px-4 bg-red-600 text-white rounded-md shadow-sm">
                Sign Out
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BookRide passengerId={passengerId} />
                <UpcomingRides passengerId={passengerId} />
                <RideHistory passengerId={passengerId} />
                <RateDriver passengerId={passengerId} />
            </div>
        </div>
    );
}

export default PassengerDashboard;
