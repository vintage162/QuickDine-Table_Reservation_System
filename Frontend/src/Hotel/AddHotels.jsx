import React, { useState } from "react";
import { Form, Button, Container, Card, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddHotels = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelOwnerName: "",
    ownerMobileNo: "",
    hotelNumber: "",
    hotelLocation: "", // FIXED TYPO
    hotelType: "veg",
    imgUrl: "",
    adminEmail: "",
    adminPassword: "",
    confirmPassword: "",
  });


  const [image, setImage] = useState(null); // Store image file
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store selected image file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.adminPassword !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]); // Append form text data
      });

      if (image) {
        formDataToSend.append("image", image); // Append image file
      }

      // Send registration request to backend with FormData
      const response = await axios.post("http://localhost:8085/hotel/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setSuccess(response.data);
        setFormData({
          hotelName: "",
          hotelOwnerName: "",
          ownerMobileNo: "",
          hotelNumber: "",
          hoteLocation: "",
          hotelType: "veg",
          adminEmail: "",
          adminPassword: "",
          confirmPassword: "",
        });
        setImage(null);
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (err) {
      console.error("Error:", err.response);
      setError("Server error. Try again later.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Card className="p-4 shadow" style={{ width: "50rem" }}>
        <h2 className="text-center mb-3">Add Hotel</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Row>
            {/* Left Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Name</Form.Label>
                <Form.Control type="text" name="hotelName" value={formData.hotelName} onChange={handleChange} required />
              </Form.Group>



              <Form.Group className="mb-3">
                <Form.Label>Owner Mobile Number</Form.Label>
                <Form.Control type="text" name="ownerMobileNo" value={formData.ownerMobileNo} onChange={handleChange} pattern="[0-9]{10}" required />
              </Form.Group>





              <Form.Group className="mb-3">
                <Form.Label>Hotel Location</Form.Label>
                <Form.Control type="text" name="hoteLocation" value={formData.hoteLocation} onChange={handleChange} required />
              </Form.Group>




              <Form.Group className="mb-3">
                <Form.Label>Upload Hotel Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Admin Password</Form.Label>
                <Form.Control type="password" name="adminPassword" value={formData.adminPassword} onChange={handleChange} required />
              </Form.Group>

            </Col>



            {/* Right Column */}

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Hotel Owner Name</Form.Label>
                <Form.Control type="text" name="hotelOwnerName" value={formData.hotelOwnerName} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hotel Contact Number</Form.Label>
                <Form.Control type="text" name="hotelNumber" value={formData.hotelNumber} onChange={handleChange} pattern="[0-9]{10}" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Hotel Type</Form.Label>
                <Form.Select name="hotelType" value={formData.hotelType} onChange={handleChange} required>
                  <option value="veg">Veg</option>
                  <option value="nonveg">Non-Veg</option>
                  <option value="both">Both</option>
                </Form.Select>
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control type="email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} required />
              </Form.Group>



              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="success" type="submit" className="w-100">Register Hotel</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddHotels;
