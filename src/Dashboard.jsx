import React, { useState, useRef } from "react";
import supabase from "./supabaseClient";

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/login";
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile && !capturedImage) {
            alert("Please select or capture an image first!");
            return;
        }

        setIsLoading(true);
        setLoadingMessage("Uploading...");
        const fileToUpload = selectedFile || dataURItoFile(capturedImage, "captured_image.png");

        const { error } = await supabase.storage.from("uploads").upload(`files/${fileToUpload.name}`, fileToUpload);

        setIsLoading(false);
        if (error) {
            alert("Upload failed: " + error.message);
        } else {
            setSelectedFile(null);
            setCapturedImage(null);
            setShowSuccess(true);  // Show success message

            setTimeout(() => {
                setShowSuccess(false);  // Hide success message after 3 seconds
            }, 3000);
        }
    };

    const openCamera = async () => {
        setIsCameraOpen(true);
        setCapturedImage(null);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
        } catch (error) {
            alert("Camera access denied: " + error.message);
        }
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setCapturedImage(canvas.toDataURL("image/png"));
        video.srcObject.getTracks().forEach((track) => track.stop());
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        openCamera();
    };

    const downloadImage = () => {
        setIsLoading(true);
        setLoadingMessage("Downloading...");
        setTimeout(() => {
            const a = document.createElement("a");
            a.href = capturedImage;
            a.download = "captured_image.png";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setIsLoading(false);
        }, 2000);
    };

    const dataURItoFile = (dataURI, filename) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const intArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        return new File([intArray], filename, { type: mimeString });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

            <div className="bg-white p-6 mt-4 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-2">Upload File</h3>
                <input type="file" onChange={handleFileChange} className="border p-2 w-full mb-4" />
                {!capturedImage && !isCameraOpen && (
                    <button onClick={openCamera} className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">Open Camera</button>
                )}

                {isCameraOpen && !capturedImage && (
                    <div className="flex flex-col items-center">
                        <video ref={videoRef} autoPlay className="w-full h-64 rounded-md"></video>
                        <button onClick={captureImage} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Capture Image</button>
                    </div>
                )}

                {capturedImage && (
                    <div className="flex flex-col items-center">
                        <img src={capturedImage} alt="Captured" className="w-full h-64 rounded-md" />
                        <div className="flex justify-between w-full mt-4">
                            <button onClick={retakePhoto} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Retake</button>
                            <button onClick={downloadImage} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Save Locally</button>
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" disabled={!selectedFile && !capturedImage}>Upload</button>
                    <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
                </div>
            </div>

            {/* Loading Screen */}
            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
                        <p className="mt-4 font-semibold text-gray-700">{loadingMessage}</p>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="text-green-500 text-6xl">✔</div>
                        <p className="mt-4 text-lg font-semibold text-gray-700">Upload Successful!</p>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
    );
};

export default Dashboard;
