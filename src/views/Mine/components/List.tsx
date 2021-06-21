//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";
const Item: React.FC = ({}) => {
  return (
    <>
      <StyledWrapBox className="wing-blank-lg width-47">
        <Spacer size="mmd" />
        <div className="flex-row-center-center">
          <img
            src={require("../../../assets/img/USDT_icon.png")}
            width="40"
            height="40"
            className="margin-left-minus-10"
          />
          <img
            src={require("../../../assets/img/PUSDT_icon.png")}
            width="40"
            height="40"
            className="margin-left-minus-10"
          />
        </div>
        <Spacer size="sm" />
        <div className="font-size-16 text-center">ETH - PETH</div>
        <Spacer size="ssm" />
        <div className="color-grey  text-center">存 LP-ETH 赚 ASET</div>
        <Spacer size="mmd" />
        <CardButton className="flex-jc-center  wing-blank-lg">
          <div className="color-grey">TVL</div>
          <div className="color-grey">$ 1,234.45</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="flex-jc-center  wing-blank-lg">
          <div className="color-grey">APY</div>
          <div className="color-grey">123.45%</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="flex-jc-center  wing-blank-lg">
          <div className="color-grey">我的质押 ( LP-USD )</div>
          <div className="color-grey">1,234.45</div>
        </CardButton>
        <Spacer size="mmd" />
        <CardButton className="flex-jc-center  wing-blank-lg">
          <div className="color-grey">待领收益 (.ASET )</div>
          <div className="color-grey">124.34</div>
        </CardButton>
        <Spacer />
        <Button text="选择" variant="secondary" />
        <Spacer size="mmd" />
      </StyledWrapBox>
  
    </>
  );
};
const List: React.FC = ({ text }) => {
  return (
    <>
      <div className="flex-jc-center width-100">
        <Item />
        <Item />
      </div>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};
const StyledWrapBox = styled(Card)`
  height: 400px;
`;
export default List;
