import React, { useState } from "react";
import styled from "styled-components";

function MarketingConsent() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <ConsentWrapper>
      <Checkbox
        type="checkbox"
        id="marketingConsent"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Label htmlFor="marketingConsent">
        I want to receive emails about the product, feature updates, events, and marketing promotions.
      </Label>
    </ConsentWrapper>
  );
}

const ConsentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
`;

const Checkbox = styled.input`
  margin-top: 2px;
`;

const Label = styled.label`
  font-family: Fira Sans, sans-serif;
`;

export default MarketingConsent;