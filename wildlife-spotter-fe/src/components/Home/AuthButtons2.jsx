import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../../AuthContext";

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #142800;
  line-height: 150%;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const Button = styled.button`
  font-family: Manrope, sans-serif;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-radius: 40px;
  padding: 8px 16px;
  background-color: #64f67b;
  color: #000;
  @media (max-width: 991px) {
    padding: 8px 20px;
  }
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const StyledLink = styled.div`
  text-decoration: none;
  display: inline-flex;
  align-items: center;
`;

function AuthButtons2() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    logout();
  };

  return (
    <ButtonGroup>
      <ProfileImage
        src={`${process.env.PUBLIC_URL}/images/profile.jpg`}
        alt="Profile"
      />
      <Button onClick={handleLogout}>Log out</Button>
    </ButtonGroup>
  );
}

export default AuthButtons2;
