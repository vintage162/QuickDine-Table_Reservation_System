import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import AddHotels from "../Hotel/AddHotels";

import SidebarAdmin from "../Component/SideBadAdmin";
import ManageHotels from "../Hotel/ManageHotel";
import CostomersBooking from "../Costomers/CostomersBooking";

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(""); 

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <SidebarAdmin setSelectedComponent={setSelectedComponent} />
        </Col>
        
        <Col md={9} className="content p-4">
          {selectedComponent === "AddHotels" && <AddHotels />}
          {selectedComponent === "ManageHotels" && <ManageHotels />}
          {selectedComponent === "CustomerBookings" && <CostomersBooking />}
                 </Col>
      </Row>
      
    </Container>
  );
};

export default AdminDashboard;
