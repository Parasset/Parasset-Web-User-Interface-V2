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
        <div className="wing-blank-lg">
          <Spacer />
          {children}
          <Spacer />
        </div>
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
export default Main;
