//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Progress from "./Progress";
import Button from "../../../components/Button";
const Depot: React.FC = ({ text }) => {
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer />
        <Progress />
        <Spacer size="sm" />
        <div className="flex-row-center-center ">
          <img
            src={require("../../../assets/img/NEST_icon.png")}
            width="40"
            height="40"
          />
          <img
            src={require("../../../assets/img/USDT_icon.png")}
            width="40"
            height="40"
            className="margin-left-minus-10"
          />
        </div>
        <Spacer size="sm" />
        <div className="font-size-16 bold-600 text-center">NEST - PUSD</div>
        <Spacer size="mmd" />
        <StyledCardButton className="wing-blank-lg">
          <div className="flex-jc-center flex1">
            <div className="color-grey">抵押资产</div>
            <div className="text-right">
              <div className="font-size-14">10,000 NEST</div>
              <div className="font-size-10 color-grey">$ 420.43</div>
            </div>
          </div>
        </StyledCardButton>
        <Spacer size="mmd" />
        <StyledCardButton className="wing-blank-lg">
          <div className="flex-jc-center flex1">
            <div className="color-grey">铸币债务</div>
            <div className="text-right">
              <div className="font-size-14">294 PUSD</div>
              <div className="font-size-10 color-grey">$ 420.43</div>
            </div>
          </div>
        </StyledCardButton>
        <Spacer size="mmd" />
        <StyledCardButton className="wing-blank-lg">
          <div className="flex-jc-center flex1">
            <div className="color-grey">稳定费</div>
            <div className="text-right font-size-14">6 PUSD</div>
          </div>
        </StyledCardButton>

        <Spacer size="md" />
        <Button text="查看" variant="secondary" />
        <Spacer />
      </Card>
      <Spacer />
    </>
  );
};
const StyledCardButton = styled(CardButton)`
  height: 50px;
  display: flex;
  align-items: center;
`;
export default Depot;
