//@ts-nocheck
import React from "react";
import styled from "styled-components";
export interface CardProps {
  className?: string;
  children?: any;
}
const Card: React.FC<CardProps> = ({ className, children,onClick }) => (
  <StyledCard className={`wing-blank ${className}`} onClick={onClick}>{children}</StyledCard>
);

const StyledCard = styled.div`
  padding:10px 30px;
  border-radius: 16px;
`;

export default Card;
