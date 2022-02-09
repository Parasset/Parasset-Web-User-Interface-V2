//@ts-nocheck
import React from "react";
import Spacer from "../Spacer";
import Card from "../Card";

const BigValue: React.FC = ({ text, color = "#5DB3D3",value }) => (
  <>
    <Card className="text-center bg-white">
      <Spacer size="sm" />
      <div className="font-size-50 bold-600 font-Wallpoet" style={{ color }}>
        {value}
      </div>
      <Spacer size="sm" />
      <div className="color-grey">{text}</div>
      <Spacer size="sm" />
    </Card>
    <Spacer />
  </>
);

export default BigValue;
