import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Right from "./Right";
import Spacer from "../../Spacer";
const Main: React.FC = ({ children }) => {
  return (
    <StyledMain className=" width-100">
      <div className="flex1">
        <Header />
        <StyledWrapBox className="wing-blank-lg">
          <Spacer />
          {children}
          <Spacer />
        </StyledWrapBox>
      </div>

      <Right />
    </StyledMain>
  );
};
const StyledMain = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;

  align-items: stretch;
  @media (max-width: 768px) {
    padding-top: 50px;
  }
`;
const StyledWrapBox = styled.div`
  @media (min-width: 1024px) {
    max-width: 830px;
    margin: 0 auto;
  }
`;
export default Main;
