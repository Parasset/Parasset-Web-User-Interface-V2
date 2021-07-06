//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";
import Tab from "../../components/Tab";
import Specie from "./components/Specie";
import Debt from "./components/Debt";
import Depot from "./components/Depot";
const Coin: React.FC = () => {
  const isMobile = useIsMobile();
  const [tabs, setTabs] = useState([
    {
      text: "铸币",
      id: 1,
    },
    {
      text: "我的债仓",
      id: 2,
    },
  ]);

  const [tab, setTab] = useState(1);
  return (
    <div className="wing-blank-xl">
      <Tab tabs={tabs} tab={tab} onChangeTab={() => {}} />
      {/* <Specie /> */}
      <Debt />
      <Depot />
    </div>
  );
};

export default Coin;
