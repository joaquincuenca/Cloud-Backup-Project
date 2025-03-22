import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./Dashboard"; // Import the Dashboard component

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard Route */}
      </Routes>
    </Router>
  </StrictMode>
);
