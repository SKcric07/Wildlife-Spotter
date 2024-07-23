import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GENERATE_OTP, VERIFY_OTP } from "../../api/urlsconfig";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpVisible, setIsOtpVisible] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(GENERATE_OTP, { email });
      if (response.status === 200) {
        setSubmittedEmail(email);
        setIsOtpVisible(true);
        setEmailError(""); // Clear any previous error messages
      } else {
        setEmailError(
          response.data.detail || "Failed to generate OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error validating email", error);
      setEmailError(
        error.response?.data?.detail ||
          "Error validating email. Please try again."
      );
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(VERIFY_OTP, {
        email: submittedEmail,
        otp,
      });
      if (response.status === 200) {
        // Extract otp_token from response body
        const { otp_token } = response.data;
        // Set otp_token as a cookie
        document.cookie = `otp_token=${otp_token}; path=/; samesite=lax`;

        console.log("OTP confirmed");
        navigate("/enterpassword");
      } else {
        setOtpError(response.data.detail || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error validating OTP", error);
      setOtpError(
        error.response?.data?.detail ||
          "Error validating OTP. Please try again."
      );
    }
  };

  const handleBack = () => {
    setIsOtpVisible(false);
    setEmail("");
    setOtp("");
    setEmailError(""); // Clear error messages when going back
    setOtpError("");
  };

  return (
    <FormWrapper>
      <form onSubmit={isOtpVisible ? handleOtpSubmit : handleEmailSubmit}>
        {isOtpVisible ? (
          <>
            <InputGroup>
              <Label htmlFor="submittedEmail">{submittedEmail}</Label>
            </InputGroup>
            <InputGroup>
              <Label htmlFor="otp">OTP</Label>
              <Input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              {otpError && <ErrorMessage>{otpError}</ErrorMessage>}
            </InputGroup>
            <BackButton type="button" onClick={handleBack}>
              Back
            </BackButton>
          </>
        ) : (
          <InputGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </InputGroup>
        )}
        <SubmitButton type="submit">
          {isOtpVisible ? "Confirm OTP" : "Submit"}
        </SubmitButton>
      </form>
    </FormWrapper>
  );
}

const SubmitButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: #111;
  display: flex;
  margin-top: 36px;
  font-size: 20px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-family: Fira Sans, sans-serif;
  width: 100%;
  @media (max-width: 991px) {
    padding: 12px 24px;
  }
`;

const BackButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 32px;
  background-color: #f44336; /* Red color for the back button */
  display: flex;
  margin-top: 12px;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-family: Fira Sans, sans-serif;
  width: 100%;
  @media (max-width: 991px) {
    padding: 10px 20px;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336; /* Red color for error messages */
  margin-top: 8px;
  font-family: Fira Sans, sans-serif;
  font-size: 14px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 400px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: Fira Sans, sans-serif;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  text-align: left;
`;

const Input = styled.input`
  border-radius: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  height: 36px;
  padding: 0 10px;
`;

export default ForgetPasswordForm;
