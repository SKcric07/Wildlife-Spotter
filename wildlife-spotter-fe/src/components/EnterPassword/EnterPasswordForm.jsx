import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import PasswordRequirements from "../SignUp/PasswordRequirements";
import { CHANGE_PASSWORD_API } from "../../api/urlsconfig";
import { useNavigate } from "react-router-dom";

function EnterPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    specialChar: false,
    uppercase: false,
    number: false,
    lowercase: false,
  });
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 8,
      specialChar: /[!@#$%^&*()_+{}\[\]:;"'<>,.?/\\|`~]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      lowercase: /[a-z]/.test(password),
    };
    setPasswordRequirements(requirements);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    } else if (
      !passwordRequirements.length ||
      !passwordRequirements.specialChar ||
      !passwordRequirements.uppercase ||
      !passwordRequirements.number ||
      !passwordRequirements.lowercase
    ) {
      setError("Password does not meet the requirements!");
      return;
    } else {
      setError("");
      try {
        const otpToken = getCookie("otp_token"); // Retrieve OTP token from cookie

        const response = await axios.post(CHANGE_PASSWORD_API, {
          new_password: newPassword,
          otp_token: otpToken, // Include OTP token in the request body
        });

        if (response.status === 200) {
          setSuccess("Password changed successfully!");
          setNewPassword("");
          setConfirmPassword("");
          navigate("/signin");
        } else {
          setError(
            response.data.detail ||
              "Failed to change password. Please try again."
          );
        }
      } catch (error) {
        console.error("Error changing password", error);
        setError(
          error.response?.data?.detail ||
            "Error changing password. Please try again."
        );
      }
    }
  };

  const handlePasswordChange = (e) => {
    const { value, name } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
      validatePassword(value);
    } else {
      setConfirmPassword(value);
    }
  };

  // Convert passwordRequirements object to array of boolean values in correct order
  const passwordRequirementsArray = [
    passwordRequirements.length,
    passwordRequirements.specialChar,
    passwordRequirements.uppercase,
    passwordRequirements.number,
    passwordRequirements.lowercase,
  ];

  // Determine if the submit button should be enabled
  const isButtonDisabled =
    newPassword !== confirmPassword ||
    !(
      passwordRequirements.length &&
      passwordRequirements.specialChar &&
      passwordRequirements.uppercase &&
      passwordRequirements.number &&
      passwordRequirements.lowercase
    );

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handlePasswordChange}
            required
          />
          <PasswordRequirements requirementsMet={passwordRequirementsArray} />
        </InputGroup>

        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handlePasswordChange}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <SubmitButton type="submit" disabled={isButtonDisabled}>
          Change Password
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
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-family: Fira Sans, sans-serif;
  width: 100%;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  @media (max-width: 991px) {
    padding: 12px 24px;
  }
`;

const SuccessMessage = styled.div`
  color: green;
  font-family: Fira Sans, sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
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

const ErrorMessage = styled.div`
  color: red;
  font-family: Fira Sans, sans-serif;
  font-size: 14px;
  margin-bottom: 20px;
`;

export default EnterPasswordForm;
