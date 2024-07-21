import React from "react";
import styled from "styled-components";

function TermsAndPrivacy() {
  return (
    <TermsWrapper>
      By creating an account, you agree to the{" "}
      <Link href="#">Terms of use</Link> and{" "}
      <Link href="#">Privacy Policy</Link>.
    </TermsWrapper>
  );
}

const TermsWrapper = styled.p`
  color: #111;
  font: 400 14px Poppins, sans-serif;
  margin-bottom: 20px;
`;

const Link = styled.a`
  color: #111;
  text-decoration: underline;
`;

export default TermsAndPrivacy;