import React from "react";
import "../Styling/AdminDashboard.css"; // Import CSS


const SidebarAdmin = ({ setSelectedComponent }) => {
  return (
    <div className="sidebar  text-white p-3">
      
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("AddHotels")}>
            ➕ Add Hotels
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("ManageHotels")}>
            🏨 Manage Hotels
          </button>
        </li>
        <li className="nav-item">
          <button className="nav-link text-white btn btn-link" onClick={() => setSelectedComponent("CustomerBookings")}>
            📋 Customer Bookings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
