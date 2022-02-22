//@ts-nocheck
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../../hooks/useIsMobile";
import dashboard from "../../../assets/svg/dashboard_icon_black.svg";
import farm from "../../../assets/svg/farm_icon_black.svg";
import farm_active from "../../../assets/svg/farm_icon_hover.svg";
import home from "../../../assets/svg/home_icon_black.svg";
import home_active from "../../../assets/svg/home_icon_hover.svg";
import liquidate from "../../../assets/svg/liquidate_icon_black.svg";
import liquidate_active from "../../../assets/svg/liquidate_icon_hover.svg";
import mint from "../../../assets/svg/mint_icon_black.svg";
import mint_active from "../../../assets/svg/mint_icon_hover.svg";
import pool from "../../../assets/svg/pool_icon_black.svg";
import pool_active from "../../../assets/svg/pool_icon_hover.svg";
import swap from "../../../assets/svg/swap_icon_black.svg";
import swap_active from "../../../assets/svg/swap_icon_hover.svg";

let flag = true;
const Nav: React.FC = ({ toggleShow }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (pathname.includes("/datum") && flag) {
      setShowMenu(true);
      flag = false;
    }
  }, [pathname, showMenu]);
  return (
    <div className="font-size-16">
      <div
        className={` ${isMobile ? "" : "wing-blank-lg bd-bottom width-100"} `}
      >
        <div className="wing-blank">
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/"
            onClick={toggleShow}
          >
            <img
              alt="image"
              src={pathname === "/" ? home_active : home}
              width="35"
              height="35"
              className="margin-right-10"
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
                (pathname.includes("/coin") ||
                  pathname.includes("/debt/detail")) &&
                !pathname.includes("/datum")
              );
            }}
          >
            <img
              alt="image"
              src={
                (pathname.includes("/coin") ||
                  pathname.includes("/debt/detail")) &&
                !pathname.includes("/datum")
                  ? mint_active
                  : mint
              }
              width="35"
              height="35"
              className="margin-right-10"
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
              alt="image"
              src={pathname.includes("/exchange") ? swap_active : swap}
              width="35"
              height="35"
              className="margin-right-10"
            />
            {t("duihuan")}
          </StyledBarItem>
          <StyledBarItem
            className="flex-jc-start"
            exact
            activeClassName="active"
            to="/itank"
            isActive={(match, { pathname }) => {
              return (
                pathname.includes("/itank") && !pathname.includes("/datum")
              );
            }}
            onClick={toggleShow}
          >
            <img
              alt="image"
              src={
                pathname.includes("/itank") && !pathname.includes("/datum")
                  ? pool_active
                  : pool
              }
              width="35"
              height="35"
              className="margin-right-10"
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
              alt="image"
              src={pathname.includes("/mine") ? farm_active : farm}
              width="35"
              height="35"
              className="margin-right-10"
            />
            {t("wakuang")}
          </StyledBarItem>

          <StyledBarItem
            className="flex-jc-start "
            exact
            activeClassName="active"
            to="/liquidation"
            onClick={toggleShow}
          >
            <img
              alt="image"
              src={
                pathname.includes("/liquidation") ? liquidate_active : liquidate
              }
              width="35"
              height="35"
              className="margin-right-10"
            />
            {t("qingsuan")}
          </StyledBarItem>
        </div>
      </div>
      <div
        className={` ${isMobile ? "" : "wing-blank-lg bd-bottom width-100"} `}
      >
        <div className="wing-blank">
          <StyledBarItem
            className="flex-jc-center cursor-pointer"
            as="div"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <div className="flex-jc-center">
              <img
                alt="image"
                src={dashboard}
                width="35"
                height="35"
                className="margin-right-10"
              />
              {t("shuju")}
            </div>

            <img
              alt="image"
              src={
                showMenu
                  ? require("../../../assets/img/icon_arrow_top.png")
                  : require("../../../assets/img/arrow_bottom_icon.png")
              }
              width="8"
              height="5"
              className="margin-left-10"
            />
          </StyledBarItem>
          {showMenu ? (
            <>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/overview"
                onClick={toggleShow}
              >
                {t("gailan")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/coin"
                onClick={toggleShow}
              >
                {t("zhubi")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/itank"
                onClick={toggleShow}
              >
                {t("bxc")}
              </StyledMenuItem>
              <StyledMenuItem
                className="flex-jc-start"
                exact
                activeClassName="active"
                to="/datum/user"
                onClick={toggleShow}
              >
                {t("yonghu")}
              </StyledMenuItem>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const StyledBarItem = styled(NavLink)`
  color: ${(props) => props.theme.color.black};
  padding-top: 10px;
  &.active {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
    font-weight: 600;
  }
  &:last-child {
    padding-bottom: 10px;
  }
`;
const StyledMenuItem = styled(StyledBarItem)`
  padding-left: 45px;
  box-sizing: border-box;
`;

export default Nav;
