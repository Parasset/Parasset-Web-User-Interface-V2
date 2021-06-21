//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
const Stake: React.FC = ({}) => {
  return (
    <>
      <StyledWrapBox className="wing-blank-lg width-47">
        <Spacer size="mmd" />
        <div className="color-grey">我的收益</div>
        <Spacer />
        <div className="wing-blank-llg  text-center">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/USDT_icon.png")}
              width="40"
              height="40"
            />
            <img
              src={require("../../../assets/img/PUSDT_icon.png")}
              width="40"
              height="40"
              className="margin-left-minus-10"
            />
          </div>

          <Spacer size="sm" />
          <div className="font-size-24 bold-600">10,000</div>
          <Spacer size="sm" />
          <div className="color-grey">已抵押 ( LP-USD )</div>
          <Spacer />
          <div className="flex-jc-center">
            <Button text="授权" variant="secondary" width="47%" />
            <Button text="赎回" variant="tertiary" width="47%" />
          </div>
        </div>

        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};

const StyledWrapBox = styled(Card)`
  height: 260px;
`;

export default Stake;
