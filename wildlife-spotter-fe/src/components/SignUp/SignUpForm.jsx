import React, { useState } from "react";
import styled from "styled-components";
import PasswordRequirements from "./PasswordRequirements";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [requirementsMet, setRequirementsMet] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Function to check password requirements
  const checkPasswordRequirements = (password) => {
    const requirements = [
      /(?=.{8,})/,
      /(?=.*[\W_])/,
      /(?=.*[A-Z])/,
      /(?=.*\d)/,
      /(?=.*[a-z])/,
    ];

    const updatedRequirementsMet = requirements.map((regex) =>
      regex.test(password)
    );
    setRequirementsMet(updatedRequirementsMet);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordRequirements(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (requirementsMet.every((met) => met)) {
      try {
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email: email,
            password: password,
          }),
        });

        const result = await response.json();
        if (response.ok) {
          navigate("/signin");
        } else {
          // Parse and display the error messages
          const errorMessages = Object.values(result).flat().join(" ");
          setErrorMessage(errorMessages);
        }
      } catch (err) {
        setErrorMessage("An error occurred. Please try again.");
      }
    } else {
      setErrorMessage("Password requirements not met.");
    }
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
          <Label htmlFor="username">Name</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </InputGroup>
        <PasswordRequirements requirementsMet={requirementsMet} />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  border-radius: 32px;
  background-color: #111;
  color: #fff;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  font-family: Fira Sans, sans-serif;
  font-size: 16px;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 15px;
`;

export default SignUpForm;
