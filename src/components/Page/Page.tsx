import React from "react";
import styled from "styled-components";

import TopBar from "../TopBar";
import Main from "./components/Main";

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <TopBar />
    <Main> {children}</Main>
  </StyledPage>
);

const StyledPage = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const StyledMain = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* min-height: calc(100vh - ${(props) => props.theme.topBarSize * 2}px); */
  /* padding-bottom: ${(props) => props.theme.spacing[5]}px; */
`;

export default Page;
