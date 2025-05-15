// V9PUDTDWLEMUSKV2HPJURC2F


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

export default function CostomersBooking() {
  const [bookings, setBookings] = useState([]);
  const hotelId = localStorage.getItem("hotelId");

  useEffect(() => {
    const fetchBookings = () => {
        
      axios
        .get(`http://localhost:8085/booking/hotel/AllBookings`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => { 
          console.error("Error fetching bookings:", err);
        });
    };

    fetchBookings();
  }, [hotelId]); // Include hotelId in dependency just in case
 
        
    
  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="container mt-4">
      <h3>📋 All Bookings for Hotel</h3>

      {bookings.length === 0 ? (
        <p className="text-muted mt-3">No bookings found yet.</p>
      ) : (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Mobile</th>
              <th>People</th>
              <th>Time</th>
              <th>Occasion</th>
             
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.customerName}</td>
                <td>{booking.customerMobile}</td>
                <td>{booking.noOfPeoples}</td>
                <td>{formatDateTime(booking.bookingTime)}</td>
                <td>{booking.occasion}</td>
                
                <td>{booking.bookingStatus}</td>
                <td>
                    <button className="btn btn-success" onClick>Confirm</button>
                                        <button className="btn btn-danger" onClick style={{marginLeft:"10px"}}>Reject</button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
