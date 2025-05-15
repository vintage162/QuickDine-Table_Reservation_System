import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col, Modal, Form } from "react-bootstrap";
import { FaStar, FaLeaf, FaDrumstickBite } from "react-icons/fa";
import axios from "axios";
import "../Styling/Home.css";

const Home = () => {
  const [hotels, setHotels] = useState([]); // State for storing hotels
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    customerMobile: "",
    noOfPeoples: 0,
    bookingTime: "",
    occasion: "",
    paymentDone: false,
  });

  // Fetch hotels from backend
  useEffect(() => {
    axios
      .get("http://localhost:8085/hotel/all")
      .then((response) => setHotels(response.data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  const handleShowModal = (hotel) => {
    setSelectedHotel(hotel);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBookingSubmit = () => {

    const bookingData = {
      ...formData,
      hotel: {
        hotelId: selectedHotel.hotelId, 
      }
    };

    axios
      .post("http://localhost:8085/booking/save", bookingData)
      .then((response) => {
        alert("Booking Confirmed!");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("There was an error booking the hotel!", error);
        alert("Error booking hotel!");
      });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1>
            Welcome to <span style={{ color: "orange" }}>QuickDine</span>
          </h1>
          <p>Book your table at the best restaurants in just a few clicks!</p>
        </div>
      </div>

      {/* Hotel Cards */}
      <Container className="mt-5">
        <Row>
          {hotels.map((hotel) => (
            <Col md={4} key={hotel.id} className="mb-4">
              <Card className="shadow">
                {/* Hotel Image */}
                <Card.Img
                  variant="top"
                  src="https://via.placeholder.com/150"
                  alt={hotel.hotelName}
                  className="hotel-image"
                />
                <Card.Body>
                  <Card.Title>{hotel.hotelName}</Card.Title>
                  <p>
                    {hotel.hotelType === "veg" ? (
                      <FaLeaf color="green" size={20} />
                    ) : (
                      <FaDrumstickBite color="red" size={20} />
                    )}{" "}
                    | <FaStar color="gold" /> {hotel.rating || "N/A"}
                  </p>
                  <p>{hotel.hoteLocation}</p>
                  <Button variant="info" onClick={() => handleShowModal(hotel)}>
                    Info
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Hotel Info Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedHotel?.hotelName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedHotel?.info}</p>
          <p>
            Rating: <FaStar color="gold" /> {selectedHotel?.rating || "N/A"}
          </p>

          {/* Booking Form */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your mobile number"
                name="customerMobile"
                value={formData.customerMobile}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>No of People</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter number of people"
                name="noOfPeoples"
                value={formData.noOfPeoples}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Booking Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="bookingTime"
                value={formData.bookingTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Occasion</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter occasion eg: Birthday , Meeting"
                name="occasion"
                value={formData.occasion}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={handleBookingSubmit}>
            Book Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
