// import React, { useState } from 'react';
// import axios from 'axios';

// function RateDriver({ passengerId }) {
//     const [driverId, setDriverId] = useState('');
//     const [rating, setRating] = useState('');
//     const [success, setSuccess] = useState('');

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             await axios.post('http://localhost:5000/api/passenger/rate', {
//                 passengerId,
//                 driverId,
//                 rating,
//             });
//             setSuccess('Rating submitted successfully!');
//             setDriverId('');
//             setRating('');
//         } catch (error) {
//             console.error('Error submitting rating:', error);
//             setSuccess('');
//         }
//     };

//     return (
//         <div className="p-4 bg-white rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold mb-4">Rate a Driver</h3>
//             {success && (
//                 <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
//                     {success}
//                 </div>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-4">
//                     <label htmlFor="driverId" className="block text-sm font-medium text-gray-700">
//                         Driver ID
//                     </label>
//                     <input
//                         type="text"
//                         id="driverId"
//                         value={driverId}
//                         onChange={(e) => setDriverId(e.target.value)}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//                         placeholder="Enter driver ID"
//                         required
//                     />
//                 </div>

//                 <div className="mb-4">
//                     <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
//                         Rating (1-5)
//                     </label>
//                     <input
//                         type="number"
//                         id="rating"
//                         value={rating}
//                         onChange={(e) => setRating(e.target.value)}
//                         className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
//                         min="1"
//                         max="5"
//                         required
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
//                 >
//                     Submit Rating
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default RateDriver;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RateDriver({ passengerId }) {
    const [drivers, setDrivers] = useState([]);
    const [driverId, setDriverId] = useState('');
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/passenger/available-drivers');
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/passenger/rate', {
                passengerId,
                driverId,
                rating,
            });
            setSuccess('Rating submitted successfully!');
            setDriverId('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting rating:', error);
            setSuccess('');
        }
    };

    const handleStarClick = (value) => {
        setRating(value);
    };

    const handleStarHover = (value) => {
        setHoverRating(value);
    };

    const handleStarHoverOut = () => {
        setHoverRating(0);
    };

    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= (hoverRating || rating);

            return (
                <svg
                    key={starValue}
                    onClick={() => handleStarClick(starValue)}
                    onMouseEnter={() => handleStarHover(starValue)}
                    onMouseLeave={handleStarHoverOut}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isFilled ? 'gold' : 'gray'}
                    viewBox="0 0 24 24"
                    stroke="none"
                    className="w-6 h-6 cursor-pointer"
                >
                    <path
                        d="M12 2.25l3.354 6.793 7.52 1.087-5.437 5.298 1.282 7.487L12 18.75l-6.719 3.547 1.282-7.487-5.437-5.298 7.52-1.087L12 2.25z"
                    />
                </svg>
            );
        });
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Rate a Driver</h3>
            {success && (
                <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                    {success}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="driverId" className="block text-sm font-medium text-gray-700">
                        Select Driver
                    </label>
                    <select
                        id="driverId"
                        value={driverId}
                        onChange={(e) => setDriverId(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="">Choose a driver</option>
                        {drivers.map((driver) => (
                            <option key={driver.id} value={driver.id}>
                                {driver.name} ({driver.location})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Rating
                    </label>
                    <div className="flex space-x-1 mt-1">{renderStars()}</div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                    disabled={!rating}
                >
                    Submit Rating
                </button>
            </form>
        </div>
    );
}

export default RateDriver;
