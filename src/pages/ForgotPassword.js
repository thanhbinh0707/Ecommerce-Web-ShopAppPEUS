// ForgotPassword.js
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import AxiosInstance from "../helper/AxiosInstance"; // Ensure correct path
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AxiosInstance().post("/users/forgot-password", { email });
      Swal.fire({
        title: "Email Sent!",
        text: "Please check your email to reset your password.",
        icon: "success",
        confirmButtonText: 'Ok'
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to send reset email.",
        icon: "error",
        confirmButtonText: 'Ok'
      });
      console.error("Forgot Password error:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ width: "400px" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Send Reset Link
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
