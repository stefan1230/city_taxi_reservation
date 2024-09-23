import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginRegister() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('passenger'); // Default to 'passenger'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = isLogin
                ? { email, password }
                : { name, email, password, role };

            const url = isLogin
                ? 'http://localhost:5000/api/auth/login'
                : 'http://localhost:5000/api/auth/register';

            const response = await axios.post(url, payload);

            // Set success message
            setSuccess(`${isLogin ? 'Login' : 'Registration'} successful! Redirecting...`);

            console.log(isLogin);

            // Simulate a delay to show success message
            // setTimeout(() => {
            // Navigate to respective dashboard based on role
            if (isLogin) {
                console.log('hereee')
                if (response.data.token) {
                    localStorage.setItem('authToken', response.data.token);
                    const { token, role, id } = response.data;
                    localStorage.setItem('authToken', token);
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('userId', id);
                }
                const userRole = response.data.role; // Get the role from response
                console.log(response.data)
                if (userRole === 'driver') {
                    navigate('/driver');
                } else if (userRole === 'passenger') {
                    navigate('/passenger');
                }
            } else {
                // For registration, navigate based on role
                if (role === 'driver') {
                    navigate('/driver');
                } else {
                    navigate('/passenger');
                }
            }
            // }, 1000); // Delay navigation by 1 second
        } catch (err) {
            setError(err.response?.data?.message || 'Error submitting form');
            setSuccess('');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
                {success && (
                    <div className="mb-4 p-2 bg-green-200 text-green-800 rounded">
                        {success}
                    </div>
                )}
                <div className="mb-4">
                    <h2 className="text-xl font-bold text-center">
                        {isLogin ? 'Login' : 'Register'}
                    </h2>
                </div>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                    Select Role
                                </label>
                                <select
                                    id="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="passenger">Passenger</option>
                                    <option value="driver">Driver</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLogin ? 'Log In' : 'Register'}
                        </button>
                    </div>
                </form>

                {error && <p className="mt-4 text-red-500">{error}</p>}

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleForm}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;