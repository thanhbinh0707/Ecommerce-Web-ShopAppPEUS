// Login.js
import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import AxiosInstance from "../helper/AxiosInstance"; // Make sure this path is correct
// import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';
const Login = ({ saveUser }) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to get the navigate function
 
  const handleForgotPassword = () => {
    navigate("/forgot-password"); // Replace with your actual forgot password route
  };

  const handleRegist = () => {
    window.location.href = "/register";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await AxiosInstance().post("/users/login", {
        login: username,
        password: password,
      });
      console.log(response);
      if (response.role === "admin") {
        // if(response.isVerified === false){
        //   Swal.fire({
        //     title: "Your account is not verified!",
        //     text: "Please check your email to verify your account",
        //     icon: "error",
        //   });
        //   return;
        // };
        saveUser(response);
        console.log("Login response:", response);
        Swal.fire({
          title: "Bingo!",
          text: "Login successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1300
        }).then(() => {
          navigate("/table");
        });
      } else {
        Swal.fire({
          title: "Access denied!",
          text: "Your account is not admin",
          icon: "error",
        });
        console.log("Login response: you are not admin");
      }
    } catch (error) {
      if(error.response.status === 400){
        Swal.fire({
          title:"Opps!",
          text:"Wrong username or password!",
          icon:"error",
          showConfirmButton: false,
          timer: 1500
        });
      }else{
        Swal.fire({
          title:"Error!",
          text:"Somethings happened!",
          icon:"error",
          showConfirmButton: false,
          timer: 1500
        });
      }
     
      console.error("Login error:", error);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Col>
          <Card className="p-4 shadow" style={{ width: "400px" }}>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
                <Button variant="link" onClick={handleForgotPassword} className="mb-3" style={{ width: '100%', textAlign: 'center' }}>
                  Forgot Password?
                </Button>
                <Button variant="success" onClick={handleRegist} style={{marginTop:7}} className="w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      

    </Container>
  );
};

export default Login;
