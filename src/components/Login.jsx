import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous error message

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setErrorMessage(error.message); // Set error message in state
        } else {
            alert("Login successful!");
            navigate("/dashboard"); // Redirect to dashboard after login
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
                
                {errorMessage && ( // Display error message if exists
                    <p className="mt-2 text-sm text-red-500 text-center">{errorMessage}</p>
                )}

                <form onSubmit={handleLogin} className="mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 ${
                                errorMessage ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                            }`}
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
                            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 ${
                                errorMessage ? "border-red-500 focus:ring-red-400" : "focus:ring-blue-400"
                            }`}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="w-full mt-6 px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                        Login
                    </button>
                </form>

                {/* Add Sign Up Link Here */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
