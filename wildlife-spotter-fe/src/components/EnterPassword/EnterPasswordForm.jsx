import React, { useState } from "react";
import styled from "styled-components";

function EnterPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      console.log("New Password confirmed", { newPassword });
      // Proceed with the password change logic
    }
  };

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
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <SubmitButton type="submit">Change Password</SubmitButton>
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

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the form content vertically */
  width: 100%;
  max-width: 400px; /* Set a max width for the form */
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
