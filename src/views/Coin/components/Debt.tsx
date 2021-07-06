//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";

import BigValue from "../../../components/BigValue";


const Specie: React.FC = ({ text }) => {
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <BigValue text="抵押市值"  color="#DD8751"/>
      <BigValue text="债务市值" color="#77A89A" />
      <Spacer size="sm" />
    
    </>
  );
};

export default Specie;
