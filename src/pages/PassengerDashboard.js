import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpcomingRides from '../components/Passenger/UpcomingRides';
import RideHistory from '../components/Passenger/RideHistory';
import BookRide from '../components/Passenger/BookRide';
import RateDriver from '../components/Passenger/RateDriver';

function PassengerDashboard() {
    const [passengerId, setPassengerId] = useState(null);
    const [location, setLocation] = useState(''); // To track passenger location

    useEffect(() => {
        // Retrieve passengerId from localStorage (or use auth system)
        const id = localStorage.getItem('userId');
        const role = localStorage.getItem('userRole');

        if (role !== 'passenger') {
            console.error('Access denied: Not a passenger');
        } else {
            setPassengerId(id);
        }
    }, []);

    // Don't render the dashboard until passengerId is available
    if (!passengerId) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-2xl font-bold mb-8">Passenger Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BookRide passengerId={passengerId} location={location} />
                <UpcomingRides passengerId={passengerId} />
                <RideHistory passengerId={passengerId} />
                <RateDriver passengerId={passengerId} />
            </div>
        </div>
    );
}

export default PassengerDashboard;
