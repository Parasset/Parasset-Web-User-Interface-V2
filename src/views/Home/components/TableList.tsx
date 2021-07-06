//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
const TableList: React.FC = ({ text }) => {
  return (
    <>
      <StyledPcItem>
        <Card className=" flex-jc-center ">
          <div className="flex1 flex-jc-start">
            <img
              src={require("../../../assets/img/ETH_icon.png")}
              width="25"
              height="25"
              className="margin-right-5"
            />
            ETH
          </div>
          <div className="flex1">＄14,032.23</div>
          <div className="flex1">70%</div>
          <div className="flex1 flex-jc-center">
            <span>84%</span>
            <Button text="铸币" variant="secondary" width="80px" />
          </div>
        </Card>
        <Spacer size="sm" />
        <Spacer size="sm" />
      </StyledPcItem>
      <StyledMobileItem>
        <Card className="wing-blank-lg">
          <Spacer size="mmd" />
          <div className="color-grey">抵押资产</div>
          <Spacer size="mmd" />
          <div className="flex-row-center-center">
            <img
              src={require("../../../assets/img/ETH_icon.png")}
              width="40"
              height="40"
            />
          </div>
          <Spacer size="sm" />
          <div className="font-size-16 text-center width-100">ETH</div>

          <Spacer size="mmd" />

          <Label label="TVL" value="$ 1,234.45" />

          <Spacer size="mmd" />
          <Label label="最大抵押率" value="123.45%" />

          <Spacer size="mmd" />
          <Label label="清算抵押率" value="1,234.45" />

          <Spacer />
          <Button text="铸币" variant="secondary" />
          <Spacer size="mmd" />
        </Card>
      </StyledMobileItem>
    </>
  );
};
const StyledPcItem = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledMobileItem = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
`;

export default TableList;
