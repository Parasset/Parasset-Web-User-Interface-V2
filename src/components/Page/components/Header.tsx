import React from "react";
import styled from "styled-components";
const Header: React.FC = () => {
  return (
    <StyledHeader className="bd-bottom color-grey wing-blank-lg flex-jc-start">
      <div>
        <div>Stake Your crypto assets</div>
        <div> to mint parallel assets</div>
      </div>
    </StyledHeader>
  );
};
const StyledHeader = styled.div`
  height: 90px;
`;
export default Header;
