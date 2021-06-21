import React from "react";
import styled from "styled-components";
import logo from "../../assets/img/Parasset.png";

const Logo: React.FC = () => {
  return (
    <StyledLogo className="bd-bottom flex-row-center-center">
      <StyledLogoImg src={logo} />
    </StyledLogo>
  );
};
const StyledLogo = styled.div`
  height: 90px;
`;

const StyledLogoImg = styled.img`
  width: 148px;
  height: 44px;
  @media (max-width: 768px) {
  }
`;

export default Logo;
