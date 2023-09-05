import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add a loading state

  const handleForgotPassword = async () => {
    try {
      setLoading(true); // Set loading to true while sending the email
      const response = await axios.post("http://localhost:8083/residents/forgot_password", { email });

      console.log("API Response:", response);
      if (response.status === 200) {
        const confirmationMessage = `Email successfully sent to ${email}`;
        toast.success(confirmationMessage);
        setTimeout(() => {
          navigate("/Login"); // Navigate to the desired page after the delay
        }, 3000);
      } else {
        setError("User with the provided email not found.");
        alert("User with the provided email not found.");
      }
    } catch (error) {
      setError("User with the provided email not found.");
    }
    finally {
      setLoading(false); // Set loading back to false after email is sent or an error occurs
    }
  };

  return (
    <div className="forgot-password-body" id="root">
      <div className="form-container">
        <div className="forgot-password-box">
          <h1>Forgot Password?</h1>
          <p>Your password will be sent to your email</p>
          <input
            type="text"
            placeholder="Enter your email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <div className="button-container">
            <button className="forgot-password-button" onClick={handleForgotPassword}>
            {loading ? "Sending..." : "Send Password"} {/* Display "Sending..." while loading */}
    
            </button>
          </div>
          <ToastContainer position="top-center"/>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
