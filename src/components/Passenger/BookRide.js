import React, { useState, useEffect, useRef } from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];
const googleMapsApiKey = 'AIzaSyBocLJMN-au-tSq664locRzGZun4MFDNNs'; // Replace with your actual API key

function BookRide({ passengerId }) {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [estimatedFare, setEstimatedFare] = useState('');
    const [driverId, setDriverId] = useState('');
    const [drivers, setDrivers] = useState([]); // List of available drivers
    const [vehicleDetails, setVehicleDetails] = useState(null); // Store selected driver's vehicle details
    const [success, setSuccess] = useState('');
    const [pickupCoords, setPickupCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [hasOngoingTrip, setHasOngoingTrip] = useState(false); // Check for ongoing trips

    const pickupAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: googleMapsApiKey,
        libraries, // Load the 'places' library for autocomplete functionality
    });

    // Fetch available drivers and check for ongoing trips when the component loads
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const driversResponse = await axios.get('http://localhost:5000/api/passenger/available-drivers');
                setDrivers(driversResponse.data);

                const tripResponse = await axios.get(`http://localhost:5000/api/passenger/ongoing-trip/${passengerId}`);
                setHasOngoingTrip(tripResponse.data.hasOngoingTrip); // Update state based on API response
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInitialData();
    }, [passengerId]);

    const handleDriverSelection = (driverId) => {
        setDriverId(driverId);

        // Find the selected driver's vehicle details and set it to the state
        const selectedDriver = drivers.find(driver => driver.id === parseInt(driverId));
        if (selectedDriver && selectedDriver.vehicles && selectedDriver.vehicles.length > 0) {
            const vehicle = selectedDriver.vehicles[0]; // Assuming one vehicle per driver
            setVehicleDetails(vehicle);
        } else {
            setVehicleDetails(null); // Clear vehicle details if no vehicle found
        }
    };

    useEffect(() => {
        if (pickupCoords && destinationCoords) {
            calculateFare(); // Auto calculate fare when coordinates are set
        }
    }, [pickupCoords, destinationCoords]);

    const calculateFare = () => {
        const service = new window.google.maps.DistanceMatrixService();

        service.getDistanceMatrix(
            {
                origins: [pickupCoords],
                destinations: [destinationCoords],
                travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (response, status) => {
                if (status === 'OK') {
                    const distanceInMeters = response.rows[0].elements[0].distance.value;
                    const distanceInKilometers = distanceInMeters / 1000; // Convert meters to kilometers

                    const baseFare = 50.0; // Example base fare
                    const farePerKilometer = 55.0; // Example fare per kilometer
                    const fare = baseFare + (farePerKilometer * distanceInKilometers);

                    setEstimatedFare(fare.toFixed(2)); // Set fare with 2 decimal places
                } else {
                    console.error('Error with DistanceMatrixService:', status);
                }
            }
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!driverId) {
            alert('Please select a driver');
            return;
        }

        try {
            await axios.post('http://localhost:5000/api/passenger/book', {
                passengerId,
                driverId,
                pickupLocation,
                destination,
                fare: estimatedFare,
            });

            setSuccess('Ride booked successfully!');
            setPickupLocation('');
            setDestination('');
            setDriverId('');
            setVehicleDetails(null);
        } catch (error) {
            console.error('Error booking ride:', error);
            setSuccess('');
        }
    };

    const handlePlaceSelected = (place, isPickup) => {
        const location = place.geometry.location;
        const coords = { lat: location.lat(), lng: location.lng() };

        if (isPickup) {
            setPickupLocation(place.formatted_address);
            setPickupCoords(coords);
        } else {
            setDestination(place.formatted_address);
            setDestinationCoords(coords);
        }
    };

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Book a Ride</h3>
            {success && (
                <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                    {success}
                </div>
            )}
            {hasOngoingTrip ? (
                <div className="mb-4 p-2 bg-yellow-200 text-yellow-800 rounded">
                    You already have an ongoing trip. Please complete it before booking another ride.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700">
                            Pickup Location
                        </label>
                        <Autocomplete
                            onLoad={(autocomplete) => (pickupAutocompleteRef.current = autocomplete)}
                            onPlaceChanged={() => handlePlaceSelected(pickupAutocompleteRef.current.getPlace(), true)}
                            options={{
                                componentRestrictions: { country: 'LK' }, // Restrict to Sri Lanka
                            }}
                        >
                            <input
                                id="pickupLocation"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter pickup location"
                                required
                            />
                        </Autocomplete>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                            Destination
                        </label>
                        <Autocomplete
                            onLoad={(autocomplete) => (destinationAutocompleteRef.current = autocomplete)}
                            onPlaceChanged={() => handlePlaceSelected(destinationAutocompleteRef.current.getPlace(), false)}
                            options={{
                                componentRestrictions: { country: 'LK' }, // Restrict to Sri Lanka
                            }}
                        >
                            <input
                                id="destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Enter destination"
                                required
                            />
                        </Autocomplete>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="driver" className="block text-sm font-medium text-gray-700">
                            Select Driver
                        </label>
                        <select
                            id="driver"
                            value={driverId}
                            onChange={(e) => handleDriverSelection(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="">Select a driver</option>
                            {drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                    {driver.name} {driver.location && `(${driver.location})`}
                                </option>
                            ))}
                        </select>
                    </div>

                    {vehicleDetails && (
                        <div className="mb-4 p-2 bg-gray-100 rounded-md">
                            <h4 className="font-semibold mb-2">Vehicle Details:</h4>
                            <p><strong>Registration Number:</strong> {vehicleDetails.registrationNumber}</p>
                            <p><strong>Model:</strong> {vehicleDetails.model}</p>
                            <p><strong>Color:</strong> {vehicleDetails.color}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        {estimatedFare ? (
                            <p className="font-semibold text-blue-600">Estimated Fare: LKR {estimatedFare}</p>
                        ) : (
                            <p className="text-sm text-gray-500">Please select pickup and destination to calculate fare.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm"
                    >
                        Book Ride
                    </button>
                </form>
            )}
        </div>
    );
}

export default BookRide;
