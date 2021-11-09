//@ts-nocheck
import React from "react";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";

const BigValue: React.FC = ({
  text1,
  color1 = "#5DB3D3",
  value1,
  text2,
  color2 = "#5DB3D3",
  value2,
}) => (
  <>
    <Card className="text-center flex-jc-center">
      <div>
        <Spacer size="sm" />
        <div
          className="font-size-50 bold-600 font-Wallpoet"
          style={{ color: color1 }}
        >
          {value1}
        </div>
        <Spacer size="sm" />
        <div className="color-grey">{text1}</div>
        <Spacer size="sm" />
      </div>

      <div>
        <Spacer size="sm" />
        <div
          className="font-size-50 bold-600 font-Wallpoet"
          style={{ color: color2 }}
        >
          {value2}
        </div>
        <Spacer size="sm" />
        <div className="color-grey">{text2}</div>
        <Spacer size="sm" />
      </div>
    </Card>
    <Spacer size="sm" />
    <Spacer size="sm" />
  </>
);

export default BigValue;
