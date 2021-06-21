import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Spacer from "../../Spacer";
import { useTranslation } from "react-i18next";
const Nav: React.FC = () => {
  return (
    <div className="wing-blank-lg ">
      <div className="bd-bottom width-100">
        <div className="wing-blank">
          <StyledBarItem className="flex-jc-start">
            <img
              src={require("../../../assets/img/home_icon.png")}
              width="35"
              height="35"
              className="margin-right-5"
            />
            首页
          </StyledBarItem>
          <StyledBarItem className="flex-jc-start">
            <img
              src={require("../../../assets/img/coin_icon.png")}
              width="35"
              height="35"
              className="margin-right-5"
            />
            铸币
          </StyledBarItem>
          <StyledBarItem className="flex-jc-start">
            <img
              src={require("../../../assets/img/exchange_icon.png")}
              width="35"
              height="35"
              className="margin-right-5"
            />
            兑换
          </StyledBarItem>
          <StyledBarItem className="flex-jc-start">
            <img
              src={require("../../../assets/img/pool_icon.png")}
              width="35"
              height="35"
              className="margin-right-5"
            />
            保险池
          </StyledBarItem>
          <StyledBarItem className="flex-jc-start active">
            <img
              src={require("../../../assets/img/mine_icon.png")}
              width="35"
              height="35"
              className="margin-right-5"
            />
            挖矿
          </StyledBarItem>
        </div>
      </div>
    </div>
  );
};

const StyledBarItem = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  padding-top: 10px;
  &.active  {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
  }
  &:last-child {
    padding-bottom: 10px;
  }
`;

export default Nav;
