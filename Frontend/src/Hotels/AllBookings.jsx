// V9PUDTDWLEMUSKV2HPJURC2F


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const hotelId = localStorage.getItem("hotelId");

  useEffect(() => {
    const fetchBookings = () => {
        
      axios
        .get(`http://localhost:8085/booking/hotel/9/bookings`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => { 
          console.error("Error fetching bookings:", err);
        });
    };

    fetchBookings();
  }, [hotelId]); // Include hotelId in dependency just in case
  const handleStatusUpdate = (bookingId, status) => {
    axios
      .put(`http://localhost:8085/booking/updateStatus/${bookingId}`, { status })
      .then(() => {
        // Update UI
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, bookingStatus: status } : b
          )
        );
  
        // Send WhatsApp message if status is Confirmed
        if (status === "Confirmed") {
          const confirmedBooking = bookings.find((b) => b.id === bookingId);
          if (confirmedBooking) {
            const customerName = confirmedBooking.customerName;
            const customerMobile = confirmedBooking.customerMobile;
            const bookingTime = formatDateTime(confirmedBooking.bookingTime);
  
            const message = `Hello ${customerName}, your table booking at QuickDine for ${bookingTime} has been *confirmed*! ✅\n\nWe look forward to serving you! 🍽️\n\n- Team QuickDine`;
            const encodedMessage = encodeURIComponent(message);
            const phoneWithCountryCode = `91${customerMobile}`; // Add '91' for India
  
            // Open WhatsApp Web/Mobile
            const whatsappURL = `https://wa.me/${phoneWithCountryCode}?text=${encodedMessage}`;
            window.open(whatsappURL, "_blank");
          }
        }
      })
      .catch((err) => {
        console.error("Error updating status:", err);
      });
  };
    
  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="container mt-4">
      <h3>📋 All Bookings for Your Hotel</h3>

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
