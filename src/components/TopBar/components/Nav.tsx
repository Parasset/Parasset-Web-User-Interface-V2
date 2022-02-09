import React from "react";
import styled from "styled-components";

import Logo from "../../Logo";
import NavBar from "./NavBar";

import Version from "./Version";
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <Logo />
      <NavBar />
      <Version /> 
    </StyledNav>
  );
};

const StyledNav = styled.div`
  background-color: ${(props) => props.theme.color.grey[100]};
  border-right: 1px solid ${(props) => props.theme.color.black};
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
