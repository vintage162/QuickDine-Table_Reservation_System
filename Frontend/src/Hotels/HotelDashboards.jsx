
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";


import ManageHotels from "../Hotel/ManageHotel";
import CostomersBooking from "../Costomers/CostomersBooking";
import SidebarHotel from "../Component/SideBarHotel";
import AllBookings from "./AllBookings";

export default function HotelDashboards() {
    const [selectedComponent, setSelectedComponent] = useState(""); 

    return (
      <Container fluid>
        <Row>
          <Col md={3}>
            <SidebarHotel setSelectedComponent={setSelectedComponent} />
          </Col>
          
          <Col md={9} className="content p-4">
            {selectedComponent === "ViewAllBooking" && <AllBookings/>}
            {selectedComponent === "AcceptedBooking" && <ManageHotels />}
            {selectedComponent === "RejectedBooking" && <CostomersBooking />}
                   </Col>
        </Row>
        
      </Container>
    );
}





 
