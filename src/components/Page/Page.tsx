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
  justify-content: center;
  align-content: center;
  /*  stretch让盒子内的每个元素的高度都等于行高 */
  align-items: stretch;
  @media (max-width: 768px) {
    display: block;
  }
`;



export default Page;
