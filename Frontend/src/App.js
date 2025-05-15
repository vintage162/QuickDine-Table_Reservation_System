import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./Component/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AdminDashboard from "./Admin/AdminDashboard";
import AddHotels from "./Hotel/AddHotels";
import HotelDashboards from "./Hotels/HotelDashboards";

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/contact" element={<h1>Contact Page</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        
        <Route path="add-hotels" element={<AddHotels/>} />
        
        <Route path="/hotel-dashboard" element={<HotelDashboards/>} />
      </Routes>
    </Router>
  );
};

export default App;
