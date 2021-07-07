//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";
import Tab from "../../components/Tab";
import Specie from "./components/Specie";
import Debt from "./components/Debt";

const Coin: React.FC = () => {
  const isMobile = useIsMobile();
  const [tabs, setTabs] = useState([
    {
      text: "zhubi",
      id: 1,
    },
    {
      text: "wdzc",
      id: 2,
    },
  ]);

  const [tab, setTab] = useState(1);
  return (
    <div className="wing-blank-xl">
      <Tab tabs={tabs} tab={tab} onChangeTab={() => {}} />
      <Specie />
      {/* <Debt /> */}
    </div>
  );
};

export default Coin;
