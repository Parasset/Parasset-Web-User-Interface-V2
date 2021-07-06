//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import Card from "../Card";

const BigValue: React.FC = ({ text, color = "#5DB3D3" }) => (
  <>
    <Card className="text-center">
      <Spacer size="sm" />
      <div className="font-size-32 bold-600" style={{ color }}>
        $141.234809090.5
      </div>
      <Spacer size="sm" />
      <div className="color-grey">{text}</div>
      <Spacer size="sm" />
    </Card>
    <Spacer size="sm" />
    <Spacer size="sm" />
  </>
);

export default BigValue;
