// src/pages/Login.js
import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../helper/AxiosInstance";
import Swal from "sweetalert2";
import "./Login.css"; // CHÚ Ý: đúng chữ hoa 'L'

// SVG icons cho toggle password (UI only)
const Eye = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M12 5c5 0 9 4.5 10 7-1 2.5-5 7-10 7S3 14.5 2 12c1-2.5 5-7 10-7Zm0 3.5A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Z" fill="currentColor"/>
  </svg>
);
const EyeOff = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <path d="M3 3l18 18-1.4 1.4-3.1-3.1A12.9 12.9 0 0 1 12 19c-5 0-9-4.5-10-7a17.7 17.7 0 0 1 5.2-6.1L1.6 4.4 3 3Zm8.3 8.3l-2.6-2.6A3.5 3.5 0 0 0 8.5 12 3.5 3.5 0 0 0 12 15.5c.6 0 1.2-.1 1.7-.4l-2.4-2.4Z" fill="currentColor"/>
    <path d="M14.9 10.7l-1.5-1.5A3.5 3.5 0 0 1 14.5 12c0 .5-.1 1-.3 1.4l1.5 1.5c.2-.6.3-1.2.3-1.9a4.9 4.9 0 0 0-1.1-2.3Z" fill="currentColor"/>
  </svg>
);

const Login = ({ saveUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false); // UI only
  const pwRef = useRef(null);                  // giữ caret/focus ổn định
  const navigate = useNavigate();

  // Nền full-bleed chỉ áp cho trang login (UI only)
  useEffect(() => {
    document.body.classList.add("login-bg");
    return () => document.body.classList.remove("login-bg");
  }, []);

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegist = () => {
    navigate("/register");       // tôn trọng basename, không reload trang
  };

  // ===== GIỮ NGUYÊN LOGIC ĐĂNG NHẬP CỦA BẠN =====
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
      if (error.response?.status === 400) {
        Swal.fire({
          title: "Opps!",
          text: "Wrong username or password!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Somethings happened!",
          icon: "error",
          showConfirmButton: false,
          timer: 1500
        });
      }
      console.error("Login error:", error);
    }
  };
  // ===============================================

  // Toggle ổn định: không mất focus/caret, không submit form
  const togglePassword = () => {
    const input = pwRef.current;
    const wasFocused = document.activeElement === input;
    const start = input?.selectionStart ?? null;
    const end = input?.selectionEnd ?? null;

    setShowPw((v) => !v);

    // chờ type đổi, sau đó khôi phục focus + caret
    setTimeout(() => {
      if (input) {
        if (wasFocused) input.focus({ preventScroll: true });
        try {
          if (start !== null && end !== null) input.setSelectionRange(start, end);
        } catch {}
      }
    }, 0);
  };

  return (
    <div className="login-hero">
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 p-3"
      >
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5} xl={4}>
            <Card className="p-4 p-md-5 shadow-lg login-card border-0">
              <Card.Body>
                {/* Header đẹp hơn */}
                <div className="text-center mb-4">
                  <div className="brand-circle mb-3">A</div>
                  <h1 className="h4 fw-bold mb-1 text-dark">Admin Dashboard</h1>
                  <p className="text-secondary mb-0">Sign in to continue</p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>

                    {/* Icon nằm bên trong input, ổn định khi toggle */}
                    <div className="password-field">
                      <Form.Control
                        ref={pwRef}
                        type={showPw ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        className="pe-5"
                      />
                      <button
                        type="button"
                        className="pw-toggle"
                        onMouseDown={(e) => e.preventDefault()} // giữ focus input
                        onClick={togglePassword}
                        aria-label={showPw ? "Hide password" : "Show password"}
                        title={showPw ? "Hide password" : "Show password"}
                      >
                        {showPw ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 py-2">
                    Login
                  </Button>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <Button
                      variant="link"
                      onClick={handleForgotPassword}
                      className="p-0 fw-semibold"
                    >
                      Forgot Password?
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={handleRegist}
                    >
                      Register
                    </Button>
                  </div>
                </Form>

                <div className="text-center mt-4 small text-secondary">
                  © {new Date().getFullYear()} Admin Panel • Privacy & Security
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
