import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import AxiosInstance from "../helper/AxiosInstance";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from "sweetalert2";
const axios = AxiosInstance();


const Register = () => {
  const navigate = useNavigate(); // Hook to get the navigate function

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    gender: "",
    phone: "",
    dateOfBirth: "",
    role: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.gender === "") {
      formData.gender = "unknown";
    }
    if (formData.role === "") {
      formData.role = "User";
    }
    const registerData = {
      userName: formData.username,
      password: formData.password,
      email: formData.email,
      gender: formData.gender,
      phoneNumber: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      role: formData.role,
    };

    
    try {
      const response = await axios.post("/users/create", registerData);
      //alert successfully registered
      const id = response._id;
      console.log(" Response Id : ",id);
      Swal.fire({
        title: "Register successfully!",
        text: "Please check your email to verify your account.",
        icon: "success",
        showConfirmButton: false,
        timer: 1300
      }).then(() => {
        navigate(`/login`);
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <div style={{ paddingTop: 76 }}>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="gender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    defaultValue="unknown"
                  >
                    <option>Unknown</option>
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="dateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="role">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    defaultValue="User"
                    as="select"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option>employee</option>
                    <option>admin</option>
                    <option>owner</option>
                  </Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button
                    style={{ marginTop: 10 }}
                    variant="primary"
                    type="submit"
                  >
                    Register
                  </Button>

                  <Button
                    style={{ marginTop: 10 }}
                    variant="secondary"
                    type="reset"
                    onClick={() => navigate('/login')}
                  >
                    Already have an account? Login
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
