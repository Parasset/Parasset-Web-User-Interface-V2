import React from "react";
import styled from "styled-components";

import Logo from "../../Logo";
import NavBar from "./NavBar";

import Version from "./Version";
import Spacer from "../../Spacer";

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <Logo/>
      <WrappedNav>
        <NavBar/>
        <Spacer size={"sm"} />
        <Version/>
      </WrappedNav>
    </StyledNav>
  );
};

const WrappedNav = styled.div`
  background-color: rgba(255,255,255, 0.7);
  height: 100vh;
`

const StyledNav = styled.div`
  border-right: 1px solid black;
  min-height: 100vh;
  width: 240px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Nav;
