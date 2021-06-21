//@ts-nocheck
import React from "react";
import styled from "styled-components";
export interface CardProps {
  className?: string;
  children?: any;
}
const Card: React.FC<CardProps> = ({ className, children }) => (
  <StyledCard className={`wing-blank ${className}`}>{children}</StyledCard>
);

const StyledCard = styled.div`
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
  padding:10px 20px;
  border-radius: 8px;
`;

export default Card;
