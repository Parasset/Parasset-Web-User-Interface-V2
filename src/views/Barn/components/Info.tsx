//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";

const Info: React.FC = ({ text }) => {
  return (
    <>
      <Card className="wing-blank-lg">
        <div className="flex-jc-center">
          <div className="flex1 bd-right1 wing-blank-lg">
            <Spacer />
            <div className="color-grey">清算价格</div>
            <div className="wing-blank">
              <Spacer />
              <div className="font-size-24 bold-600 text-center">
                0.3436 USDT
              </div>
              <Spacer />
              <div className="flex-jc-center">
                <Label label="当前 NEST-USDT 价格" value="0.1635" />
              </div>
              <Spacer />
            </div>
            <Spacer />
          </div>
          <div className="flex1 wing-blank-lg">
            <Spacer />
            <div className="color-grey">当前抵押率</div>
            <div className="wing-blank">
              <Spacer />
              <div className="font-size-24 bold-600 text-center">73.45 %</div>
              <Spacer />
              <div className="flex-jc-center">
                <Label label="清算抵押率" value="0.1635" />
              </div>
              <Spacer />
            </div>
            <Spacer />
          </div>
        </div>
      </Card>
      <Spacer />
    </>
  );
};

export default Info;
