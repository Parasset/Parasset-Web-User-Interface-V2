import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Logo from "../../Logo";
import NavBar from "./NavBar";
// import Footer from "./Footer";
import Lang from "./Lang";
import Version from "./Version";
import { useTranslation } from "react-i18next";
const Nav: React.FC = () => {
  return (
    <StyledNav>
      <Logo />
      <NavBar />
      {/* <Footer /> */}
      <Lang />
      <Version />
    </StyledNav>
  );
};

const StyledNav = styled.div`
  background-color: ${(props) => props.theme.color.grey[100]};
  border-right: 1px solid ${(props) => props.theme.color.grey[200]};
  height: 100vh;
  width: 240px;
`;

export default Nav;
