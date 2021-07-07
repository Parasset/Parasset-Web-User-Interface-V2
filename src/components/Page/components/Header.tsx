//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Logo from "../../Logo";
import Tab from "../../Tab";
import Spacer from "../../Spacer";
import Datum from "./Datum";

import Nav from "./Nav";

const Header: React.FC = () => {
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

  return (
    <>
      <StyledHeaderPc className="bd-bottom color-grey wing-blank-lg flex-jc-start">
        <StyledHeaderText>
         <div>{t('dypxzc')}</div>
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
          <Tab tabs={tabs} tab={tab} onChangeTab={() => {}} />
          <Spacer size="mmd" />
          {tab === 2 ? <Datum /> : <Nav />}
        </div>
      </StyledSidebar>
    </>
  );
};

const StyledHeaderPc = styled.div`
  height: 90px;
  @media (max-width: 768px) {
    display: none !important;
  }
`;
const StyledHeaderMobile = styled.div`
  height: 50px;
  @media (min-width: 1024px) {
    display: none !important;
  }
`;

const StyledMask = styled.div`
  position: fixed;
  height: calc(100vh - 51px);
  background: rgba(0, 0, 0, 0.45);
  top: 51px;
  left: 0;
  width: 100%;
  z-index: 8888;
`;
const StyledSidebar = styled.div`
  background: #fff;
  position: fixed;
  height: calc(100vh - 51px);
  top: 51px;
  left: -220px;
  width: 220px;
  z-index: 9999;
  transition: all 0.2s ease-in-out;
`;

const StyledHeaderText = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default Header;
