//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";
import Label from "../../../components/Label";

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

        <Spacer size="mmd" />
        <Label label="TVL" value="$ 1,234.45" />

        <Spacer size="mmd" />
        <Label label="我的份额" value="1,234.45" />

        <Spacer size="mmd" />
        <Label label="我的占比" value="12.34%" />

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
  height: 330px;
`;
export default List;
