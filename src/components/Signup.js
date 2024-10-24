
import { React, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../App.css"; // تأكد من وجود ملف CSS لتنسيق الزر داخل حقل الإدخال

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const isPasswordStrong = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    
    if (!isPasswordStrong(passwordRef.current.value)) {
      return setError("Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/update-profile");
    } catch {
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label htmlFor="email">Email</Form.Label>
              <Form.Control id="email" type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  id="password"
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: "0 0.25rem 0.25rem 0" }} // جعل الزر متناسقًا مع حقل الإدخال
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password-confirm">Password Confirmation</Form.Label>
              <div className="input-group">
                <Form.Control
                  id="password-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  ref={passwordConfirmRef}
                  required
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{ borderRadius: "0 0.25rem 0.25rem 0" }} // جعل الزر متناسقًا مع حقل الإدخال
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </Button>
              </div>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
