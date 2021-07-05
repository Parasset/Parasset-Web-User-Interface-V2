//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
const Info: React.FC = ({ text }) => {
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer size="mmd" />
        <div className="color-grey">矿池概览</div>
        <div className="wing-blank">
          <Spacer />
          <div className="flex-jc-center">
            <Label label="抵押数 ( LP-USD )" value="564,564.68" />
            <Label label="日产量 ( ASET )" value="253" />
          </div>
          <Spacer />
          <div className="flex-jc-center">
            <Label label="TVL" value="$ 564,564.68" />
            <Label label="APY" value="102.47%" />
          </div>
          <Spacer />
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer />
    </>
  );
};

export default Info;
