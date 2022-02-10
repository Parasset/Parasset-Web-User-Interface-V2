import React from "react";
import styled from "styled-components";
import logo from "../../assets/svg/Parasset_logo_black.svg";
const Logo: React.FC = () => {
  return (
    <StyledLogo className={`flex-row-center-center`}>
      <StyledLogoImg src={logo} />
    </StyledLogo>
  );
};
const StyledLogo = styled.div`
  height: 88px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const StyledLogoImg = styled.img`
  width: 148px;
  height: 44px;
  @media (max-width: 768px) {
    width: 98px;
    height: 29px;
  }
`;

export default Logo;
