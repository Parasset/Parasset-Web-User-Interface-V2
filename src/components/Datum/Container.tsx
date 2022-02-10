//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";
import styled from "styled-components";
const Container: React.FC = ({ title, children }) => (
  <>
    <StyledContainer>
      <Spacer size={"sm"} />
      <div className="color-dark font-size-16">{title}</div>
      <Spacer size={"sm"} />
      {children}
      <Spacer />
    </StyledContainer>
    <Spacer />
  </>
);

const StyledContainer = styled(Card)`
  background-color: rgba(255, 255, 255, 0.9);
  @media (max-width: 768px) {
    padding: 10px 16px;
  }
`;
export default Container;
