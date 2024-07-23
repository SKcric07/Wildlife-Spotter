import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { LOGIN_API_URL } from "../../api/urlsconfig";
import { AuthContext } from "../../AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(LOGIN_API_URL, { email, password });
      const { message, user, access_token } = response.data;
      Cookies.set("access_token", access_token, { expires: 1 / 6 });

      setSuccess(message);
      login(user);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
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
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <ForgotPassword to="/forgotpassword">
          Forgot your password?
        </ForgotPassword>
        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </SubmitButton>
      </form>
      <LoginPrompt>
        Don't have an account? <LoginLink to="/signup">Sign Up</LoginLink>
      </LoginPrompt>
    </FormWrapper>
  );
}

// Styled components
const ForgotPassword = styled(Link)`
  font-family: Fira Sans, sans-serif;
  text-decoration: underline;
  color: #111;
  cursor: pointer;
  margin-top: 8px;
  display: inline-block;
`;

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
  &:disabled {
    background-color: #888;
    cursor: not-allowed;
  }
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px 0;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 14px;
  margin: 10px 0;
`;

const LoginPrompt = styled.p`
  color: #111;
  font: 400 14px Poppins, sans-serif;
  margin-top: 12px;
`;

const LoginLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
  color: #111;
`;

export default LoginForm;
