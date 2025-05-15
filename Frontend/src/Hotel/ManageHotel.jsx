import React, { useEffect, useState } from "react";
import { Table, Container, Button, Alert, Modal, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa"; // Import the Edit icon from react-icons
import axios from "axios";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false); // To show modal
  const [selectedHotel, setSelectedHotel] = useState(null); // Selected hotel to update
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelOwnerName: "",
    ownerMobileNo: "",
    hotelNumber: "",
    hoteLocation: "",
    hotelType: "veg",
    imgUrl: "",
    adminEmail: "",
    adminPassword: "",
  });

  // Fetch hotels from backend
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8085/hotel/all");
      setHotels(response.data);
    } catch (err) {
      setError("Failed to fetch hotels. Try again later.");
      console.error("Error fetching hotels:", err);
    }
  };

  // Load hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Update action
  const handleUpdate = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      hotelName: hotel.hotelName,
      hotelOwnerName: hotel.hotelOwnerName,
      ownerMobileNo: hotel.ownerMobileNo,
      hotelNumber: hotel.hotelNumber,
      hoteLocation: hotel.hoteLocation,
      hotelType: hotel.hotelType,
      imgUrl: hotel.imgUrl,
      adminEmail: hotel.adminEmail,
      adminPassword: hotel.adminPassword,
    });
    setShowUpdateModal(true);
  };

  // Submit updated hotel data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8085/hotel/update/${selectedHotel.hotelId}`,
        formData
      );
      if (response.status === 200) {
        setHotels(
          hotels.map((hotel) =>
            hotel.hotelId === selectedHotel.hotelId ? response.data : hotel
          )
        );
        setShowUpdateModal(false);
        setError("");
      }
    } catch (err) {
      setError("Failed to update hotel. Try again.");
    }
  };

  const handleDelete = async (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const response = await axios.delete(
          `http://localhost:8085/hotel/${hotelId}`
        );
  
        if (response.status === 200) {
          // Remove the deleted hotel from the state
          setHotels(hotels.filter((hotel) => hotel.hotelId !== hotelId));
        } else {
          setError("Failed to delete hotel. Try again.");
        }
      } catch (err) {
        setError("Error deleting hotel. Please try again.");
        console.error("Error deleting hotel:", err);
      }
    }
  };
  
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Manage Hotels</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Hotel Name</th>
            <th>Owner</th>
            <th>Contact</th>
            <th>Location</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels.length > 0 ? (
            hotels.map((hotel) => (
              <tr key={hotel.hotelId}>
                <td>{hotel.hotelId}</td>
                <td>{hotel.hotelName}</td>
                <td>{hotel.hotelOwnerName}</td>
                <td>{hotel.hotelNumber}</td>
                <td>{hotel.hoteLocation}</td>
                <td>{hotel.hotelType}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleUpdate(hotel)}
                    className="me-2"
                  >
                    <FaEdit /> Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(hotel.hotelId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No hotels found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Update Hotel Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hotel Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="hotelOwnerName"
                value={formData.hotelOwnerName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Owner Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="ownerMobileNo"
                value={formData.ownerMobileNo}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit mobile number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hotel Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="hotelNumber"
                value={formData.hotelNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Enter a valid 10-digit number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hotel Location</Form.Label>
              <Form.Control
                type="text"
                name="hoteLocation"
                value={formData.hoteLocation}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hotel Type</Form.Label>
              <Form.Select
                name="hotelType"
                value={formData.hotelType}
                onChange={handleChange}
                required
              >
                <option value="veg">Veg</option>
                <option value="nonveg">Non-Veg</option>
                <option value="both">Both</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Hotel Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imgUrl"
                value={formData.imgUrl}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Admin Email</Form.Label>
              <Form.Control
                type="email"
                name="adminEmail"
                value={formData.adminEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Admin Password</Form.Label>
              <Form.Control
                type="password"
                name="adminPassword"
                value={formData.adminPassword}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Update Hotel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManageHotels;
