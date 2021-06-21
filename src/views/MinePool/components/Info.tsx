//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";

const Info: React.FC = ({ text }) => {
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer size="mmd" />
        <div className="color-grey">矿池概览</div>
        <div className="wing-blank">
          <Spacer />
          <div className="flex-jc-center">
            <CardButton className="width-47 flex-jc-center">
              <div className="color-grey">抵押数 ( LP-USD )</div>
              <div>564,564.68</div>
            </CardButton>
            <CardButton className="width-47 flex-jc-center">
              <div className="color-grey">日产量 ( ASET )</div>
              <div>253</div>
            </CardButton>
          </div>
          <Spacer />
          <div className="flex-jc-center">
            <CardButton className="width-47 flex-jc-center">
              <div className="color-grey">TVL</div>
              <div>$ 564,564.68</div>
            </CardButton>
            <CardButton className="width-47 flex-jc-center">
              <div className="color-grey">APY</div>
              <div>102.47%</div>
            </CardButton>
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
