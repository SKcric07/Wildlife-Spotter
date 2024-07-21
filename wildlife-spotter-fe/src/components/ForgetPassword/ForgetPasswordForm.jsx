import React, { useState } from "react";
import styled from "styled-components";

function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP confirmed", { email, otp });
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
          <Label htmlFor="otp">OTP</Label>
          <Input
            type="text"
            id="text"
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </InputGroup>

        <SubmitButton type="submit">Submit</SubmitButton>
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
