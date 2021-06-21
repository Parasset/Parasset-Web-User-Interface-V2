//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
const Harvest: React.FC = ({}) => {
  return (
    <>
      <StyledWrapBox className="wing-blank-lg width-47">
        <Spacer size="mmd" />
        <div className="color-grey">我的收益</div>
        <Spacer />
        <div className="wing-blank-llg  text-center">
          <img
            src={require("../../../assets/img/ASETToken_icon.png")}
            width="40"
            height="40"
          />
          <Spacer size="sm" />
          <div className="font-size-24 bold-600">10,000</div>
          <Spacer size="sm" />
          <div className="color-grey">待领取收益 ( ASET )</div>
          <Spacer />
          <Button text="领取收益" variant="secondary" />
        </div>

        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};

const StyledWrapBox = styled(Card)`
  height: 260px;
`;

export default Harvest;
