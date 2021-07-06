//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";
const Item: React.FC = ({}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <StyledWrapBox className={`wing-blank-lg ${isMobile ? "" : "width-47"} `}>
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

        <Label label="TVL" value="$ 1,234.45" />
        <Spacer size="mmd" />
        <Label label="APY" value="123.45%" />

        <Spacer size="mmd" />
        <Label label="我的质押 ( LP-USD )" value="1,234.45" />

        <Spacer size="mmd" />
        <Label label="待领收益 (.ASET )" value="124.34" />

        <Spacer />
        <Button text="选择" variant="secondary" />
        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};
const List: React.FC = ({}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `}>
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
  @media (max-width: 768px) {
    margin-bottom: 16px;
    height: auto;
  }
`;
export default List;
