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
          <div>抵押资产数量</div>
          <div>
            余额：<span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />
        <div className="wing-blank-lg">
          <div>
            <div className="color-grey">抵押率</div>
          </div>
          <Spacer size="sm" />
          <div className=" color-grey flex-jc-center ">
            <div>1%</div>
            <div>70%</div>
          </div>
        </div>
        <Spacer size="mmd" />
        <CardButton className="wing-blank-lg flex-jc-center">
          <div className="color-grey">PUSD 合约</div>
          <div>0x4657df32…675df23b</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="wing-blank-lg flex-jc-center">
          <div className="color-grey">预言机调用费</div>
          <div>0.01 ETH</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="wing-blank-lg flex-jc-center">
          <div className="color-grey">稳定费</div>
          <div>0.01 PUSD</div>
        </CardButton>
        <Spacer />
        <Button text="铸币" variant="secondary" />

        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};

export default Specie;
