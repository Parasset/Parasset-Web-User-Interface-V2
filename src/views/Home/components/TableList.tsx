//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
const TableList: React.FC = ({ text }) => {
  return (
    <>
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
          <Button text="铸币" variant="secondary" width="80px"/>
        </div>
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};

export default TableList;
