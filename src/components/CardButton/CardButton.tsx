//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
export interface CardProps {
  className?: string;
  children?: any;
}
const CardButton: React.FC<CardProps> = ({
  children,
  className = "text-center  flex-row-center-center ",
  size,
}) => (
  <>
    <StyledButton className={`wing-blank ${className}`}>
      {size === "lg" ? <Spacer size="sm" /> : null}
      {children}
      {size === "lg" ? <Spacer size="sm" /> : null}
    </StyledButton>
  </>
);

const StyledButton = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
  border-radius: 999999px;
  min-height: 35px;
`;

export default CardButton;
