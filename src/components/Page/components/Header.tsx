//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../../Logo";
import Tab from "../../Tab";
import Spacer from "../../Spacer";
import Datum from "./Datum";
import WalletModal from "../../WalletModal";
import Nav from "./Nav";

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [isOpen, setOpen] = useState(false);
  const [tabs, setTabs] = useState([
    {
      text: "caidan",
      id: 1,
    },
    {
      text: "shuju",
      id: 2,
    },
  ]);

  const [tab, setTab] = useState(1);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const toggleShow = useCallback(async () => {
    setShow(!show);
  }, [show, setShow]);

  const title = useMemo(() => {
    if (pathname === "/") {
      return "home_title";
    }else if (
      pathname.includes("/data") ||
      pathname.includes("/debt/detail")
    ){

    } else if (
      pathname.includes("/coin") ||
      pathname.includes("/debt/detail")
    ) {
      return "coin_title";
    } else if (pathname.includes("/exchange")) {
      return "exchange_title";
    } else if (pathname.includes("/itank")) {
      return "itank_title";
    } else if (pathname.includes("/mine")) {
      return "mine_title";
    }
  }, [pathname]);

  return (
    <>
      <StyledHeaderPc className=" color-grey wing-blank-lg flex-jc-start">
        <StyledHeaderText>
          <div>{t(title)}</div>
        </StyledHeaderText>
      </StyledHeaderPc>
      <StyledHeaderMobile className="bd-bottom color-grey wing-blank-lg flex-jc-center">
        <img
          src={require("../../../assets/img/icon_menu.png")}
          width="28"
          height="28"
          onClick={toggleShow}
        />
        <Logo />
        <div></div>
      </StyledHeaderMobile>
      {show ? (
        <>
          <StyledMask onClick={toggleShow}></StyledMask>
        </>
      ) : null}
      <StyledSidebar style={{ left: show ? 0 : "-220px" }}>
        <div className="wing-blank-lg">
          <Spacer size="mmd" />
          <Tab tabs={tabs} tab={tab} onChangeTab={setTab} />
          <Spacer size="mmd" />
          {tab === 2 ? (
            <Datum />
          ) : (
            <Nav
              toggleShow={toggleShow}
              onShowWallet={() => {
                toggleShow();
                setOpen(true);
              }}
            />
          )}
        </div>
      </StyledSidebar>
      <WalletModal
        isOpen={isOpen}
        key={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

const StyledHeaderPc = styled.div`
  height: 90px;
  position: fixed;
  top: 0;
  left: 0;
  padding-left: 260px;
  padding-right: 240px;
  background: white;
  z-index: 99;
  border-bottom: 1px solid rgba(238, 238, 238, 0.4);
  @media (max-width: 768px) {
    display: none !important;
  }
`;
const StyledHeaderMobile = styled.div`
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  border-bottom: 1px solid rgba(238, 238, 238, 0.4);
  background-color: #fff;
  @media (min-width: 1024px) {
    display: none !important;
  }
`;

const StyledMask = styled.div`
  position: fixed;
  height: calc(100vh - 50px);
  background: rgba(0, 0, 0, 0.45);
  top: 50px;
  left: 0;
  width: 100%;
  z-index: 888;
`;
const StyledSidebar = styled.div`
  background: #fff;
  position: fixed;
  height: calc(100vh - 50px);
  top: 50px;
  left: -220px;
  width: 220px;
  z-index: 999;
  transition: all 0.2s ease-in-out;
`;

const StyledHeaderText = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
