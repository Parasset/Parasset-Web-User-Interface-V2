//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import Card from "../Card";
const BtnLink: React.FC = ({ text }) => {
  return (
    <>
      <Spacer size="mmd" />
      <Card className="wing-blank-lg width-100 text-center">
        <span className="color-light-blue text-underline">{text}</span>
      </Card>
    </>
  );
};


export default BtnLink;
