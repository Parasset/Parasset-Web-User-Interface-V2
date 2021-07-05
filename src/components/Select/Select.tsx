//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import CardButton from "../CardButton";

const Select: React.FC = ({}) => (
  <CardButton className="wing-blank-lg" size="lg">
  

    <div className="flex-jc-center">
      <div className="flex-jc-center">
        <img
          src={require("../../assets/img/ETH_icon.png")}
          width="35"
          height="35"
          className="margin-right-10"
        />
        ETH
        <img
          src={require("../../assets/img/arrow_bottom_icon.png")}
          width="8"
          height="5"
          className="margin-left-10"
        />
      </div>
      <div>0.000001</div>
    </div>

   
  </CardButton>
);

export default Select;
