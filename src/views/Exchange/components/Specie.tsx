//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
const Specie: React.FC = ({ text }) => {
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <Card className="wing-blank-lg">
        <Spacer />
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>从</div>
          <div>
            余额：<span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />
        <StyledExchangeImg className="text-center">
          <img
            src={require("../../../assets/img/change_icon.png")}
            width="50"
            height="50"
            className="center-block"
          />
        </StyledExchangeImg>
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>到</div>
          <div>
            余额：<span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />

        <CardButton className="wing-blank-lg flex-jc-center">
          <div className="color-grey">兑换比例</div>
          <div>1 ETH = 1200 PUSD</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="wing-blank-lg flex-jc-center">
          <div className="color-grey">手续费</div>
          <div>0.01 PETH</div>
        </CardButton>
        <Spacer />
        <Button text="兑换" variant="secondary" />
        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};
const StyledExchangeImg = styled.div`
  margin-top: -10px;
  margin-bottom: -10px;
`;
export default Specie;
