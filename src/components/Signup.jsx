import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import supabase from "../supabaseClient"; // Import the Supabase client

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({ email, password });

        if (error) {
            alert(error.message);
        } else {
            alert("Signup successful! Please check your email for verification.");
            navigate("/login"); // Redirect to login
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
                <form onSubmit={handleSignup} className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full mt-6 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Sign Up
                    </button>
                </form>
                {/* Add "Already have an account?" Login Link Here */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
