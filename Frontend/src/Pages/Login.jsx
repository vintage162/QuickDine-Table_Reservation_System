import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../Styling/Login.css";  

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8085/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("Backend response:", data); 
  
      if (data.userType === "admin") {
        navigate("/admin-dashboard");
      } else if (data.userType === "hotel") {
        navigate("/hotel-dashboard");
      } else {
        alert("Unknown user role: " + JSON.stringify(data));
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };
  
  
  return (
    <Container className="d-flex justify-content-center align-items-center login-container">
      <Card className="login-card shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Login to <h1>QuickDine</h1></h2>
          <Form onSubmit={handleLogin}>
            {/* Email Input */}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Password Input */}
            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* Remember Me & Forgot Password */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <Form.Check type="checkbox" label="Remember me" />
              <a href="/forgot-password" className="forgot-link">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button variant="success" type="submit" className="w-100 mt-4">
              Login
            </Button>

            {/* Register Link */}
            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
