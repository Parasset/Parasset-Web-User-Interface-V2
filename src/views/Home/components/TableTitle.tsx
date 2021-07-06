//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
const TableTitle: React.FC = ({ text }) => {
  return (
    <StyledTableTitleBox>
      <Card className=" flex-jc-center color-grey">
        <div className="flex1">抵押资产</div>
        <div className="flex1">TVL</div>
        <div className="flex1">最大抵押率</div>
        <div className="flex1">清算抵押率</div>
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </StyledTableTitleBox>
  );
};
const StyledTableTitleBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default TableTitle;
