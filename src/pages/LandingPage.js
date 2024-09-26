import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mb-8 text-indigo-600">Welcome to City Taxi</h1>
            <p className="text-lg text-gray-700 mb-6">Your reliable taxi reservation service</p>

            <div className="space-x-4">
                <Link to="/login">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">
                        Register
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
