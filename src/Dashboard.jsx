import React, { useState } from "react";
import supabase from "./supabaseClient"; // Import Supabase for authentication

const Dashboard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Function to handle logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login"; // Redirect to login
    };

    // Function to open file upload modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Function to handle file selection
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    // Function to handle file upload
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first!");
            return;
        }

        const { data, error } = await supabase.storage
            .from("uploads") // Replace with your storage bucket name
            .upload(`files/${selectedFile.name}`, selectedFile);

        if (error) {
            alert("File upload failed: " + error.message);
        } else {
            alert("File uploaded successfully!");
            setSelectedFile(null);
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-3xl font-bold text-gray-700">Dashboard</h2>

            {/* Open File Upload Modal */}
            <button
                onClick={openModal}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
                Upload Files
            </button>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                Logout
            </button>

            {/* File Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">Upload File</h3>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="border p-2 w-full"
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleUpload}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                            >
                                Upload
                            </button>
                            <button
                                onClick={closeModal}
                                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
