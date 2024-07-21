import React, { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom'

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password change confirmed", { email, newPassword, confirmNewPassword });
  };

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
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
        </InputGroup>

        <InputGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="confirmNewPassword">Confirm new Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </InputGroup>
        <SubmitButton type="submit">Change password</SubmitButton>
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

export default ForgetPasswordForm;
