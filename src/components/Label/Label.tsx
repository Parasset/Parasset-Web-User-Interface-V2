//@ts-nocheck
import React from "react";
import styled from "styled-components";
import CardButton from "../CardButton";
export interface LabelProps {
  className?: string;
  children?: any;
}
const Label: React.FC<LabelProps> = ({ className, label, value, }) => (
  <CardButton className={` ${className} flex-jc-center `}>
    <div className="color-grey">{label}</div>
    <div>{value}</div>
  </CardButton>
);

export default Label;
