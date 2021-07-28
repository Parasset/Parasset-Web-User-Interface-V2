//@ts-nocheck
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spacer from "../../Spacer";
import useIsMobile from "../../../hooks/useIsMobile";
const Nav: React.FC = ({toggleShow}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <div className="wing-blank-lg ">
      <div className={` ${isMobile ? "" : "bd-bottom width-100"} `}>
        <div className="wing-blank">
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/"
            onClick={toggleShow}
          >
            <img
              src={
                pathname === "/"
                  ? require("../../../assets/img/home_icon1.png")
                  : require("../../../assets/img/home_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("shouye")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/coin"
            onClick={toggleShow}
            isActive={(match, { pathname }) => {
              return (
                pathname.includes("/coin") || pathname.includes("/debt/detail")
              );
            }}
          >
            <img
              src={
                pathname.includes("/coin") || pathname.includes("/debt/detail")
                  ? require("../../../assets/img/coin_icon1.png")
                  : require("../../../assets/img/coin_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("zhubi")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/exchange"
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/exchange")
                  ? require("../../../assets/img/exchange_icon1.png")
                  : require("../../../assets/img/exchange_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("duihuan")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/itank"
            isActive={(match, { pathname }) => {
              return pathname.includes("/itank");
            }}
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/itank")
                  ? require("../../../assets/img/pool_icon1.png")
                  : require("../../../assets/img/pool_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("bxc")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start "
            exact
            activeClassName="active"
            to="/mine"
            isActive={(match, { pathname }) => {
              return pathname.includes("/mine");
            }}
            onClick={toggleShow}
          >
            <img
              src={
                pathname.includes("/mine")
                  ? require("../../../assets/img/pool_icon1.png")
                  : require("../../../assets/img/pool_icon.png")
              }
              width="35"
              height="35"
              className="margin-right-5"
            />
            {t("wakuang")}
          </StyledBarItem>
        </div>
      </div>
    </div>
  );
};

const StyledBarItem = styled(NavLink)`
  color: ${(props) => props.theme.color.grey[300]};
  padding-top: 10px;
  &.active {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
  }
  &:last-child {
    padding-bottom: 10px;
  }
`;

export default Nav;
