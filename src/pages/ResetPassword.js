// ResetPassword.js
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import AxiosInstance from "../helper/AxiosInstance"; // Ensure correct path
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams(); // Get the token from URL
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Attempting to reset password with token:", token); // Log the token
    console.log("New password:", password);
    try {
      await AxiosInstance().post(`/users/reset/${token}`, { password });
      Swal.fire({
        title: "Password Reset!",
        text: "Your password has been successfully reset.",
        icon: "success",
        confirmButtonText: 'Ok'
      }).then(() => {
        navigate("/login");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to reset password.",
        icon: "error",
        confirmButtonText: 'Ok'
      });
      console.error("Reset Password error:", error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ width: "400px" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Reset Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
