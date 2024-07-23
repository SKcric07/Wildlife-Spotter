import React from "react";
import styled from "styled-components";

const PasswordRequirements = ({ requirementsMet = [] }) => {
  const requirements = [
    "Use 8 or more characters",
    "One special character",
    "One Uppercase character",
    "One number",
    "One lowercase character",
  ];

  return (
    <RequirementsList>
      {requirements.map((req, index) => (
        <RequirementItem key={index} $met={requirementsMet[index]}>
          <Bullet />
          <RequirementText $met={requirementsMet[index]}>{req}</RequirementText>
        </RequirementItem>
      ))}
    </RequirementsList>
  );
};

const RequirementsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
  color: rgba(102, 102, 102, 0.6);
  padding: 0;
  list-style-type: none;
  margin-bottom: 24px;
`;

const RequirementItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  color: ${(props) => (props.$met ? "green" : "rgba(102, 102, 102, 0.6)")};
`;

const Bullet = styled.span`
  background-color: currentColor; /* Bullet inherits the text color */
  border-radius: 50%;
  width: 8px;
  height: 8px;
  display: inline-block;
`;

const RequirementText = styled.span`
  font-family: Fira Sans, sans-serif;
  color: ${(props) => (props.$met ? "green" : "rgba(102, 102, 102, 0.6)")};
`;

export default PasswordRequirements;
