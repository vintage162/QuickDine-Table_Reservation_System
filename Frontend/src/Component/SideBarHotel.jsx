import React from "react";
import "../Styling/AdminDashboard.css"; // Import CSS


const SidebarHotel = ({ setSelectedComponent }) => {
  return (
    <div className="sidebar  text-white p-3">
      
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("ViewAllBooking")}>
          📋 View All Bookings
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("")}>
          ✅ Accept Bookings
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("")}>
          ❌ Reject Bookings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarHotel;
