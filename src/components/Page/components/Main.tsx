//@ts-nocheck
import React, { useMemo } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Right from "./Right";
import Spacer from "../../Spacer";
const Main: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const isDatumPath = useMemo(() => {
    return pathname.includes("/datum");
  }, [pathname]);
  console.log(
    "🚀 ~ file: Main.tsx ~ line 12 ~ isDataPath ~ isDataPath",
    isDatumPath
  );

  return (
    <StyledMain className=" width-100" isDatumPath={isDatumPath}>
      <div className="flex1">
        <Header />
        <StyledWrapBox className="wing-blank-lg" isDatumPath={isDatumPath}>
          <Spacer />
          {children}
          <Spacer />
        </StyledWrapBox>
      </div>
      {!isDatumPath ? <Right /> : null}
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
  @media (min-width: 1024px) {
    padding-left: 240px;
    padding-right: ${({ isDatumPath }) => (isDatumPath ? "0" : "240px")};
  }
`;
const StyledWrapBox = styled.div`
  @media (min-width: 1024px) {
    max-width: ${({ isDatumPath }) => (isDatumPath ? "none" : "960px")};
    margin: 0 auto;
  }
`;
export default Main;
