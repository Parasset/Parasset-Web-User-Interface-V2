//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../hooks/useIsMobile";
import Tab from "../../components/Tab";
import Specie from "./components/Specie";
import Debt from "./components/Debt";
import RiskModal from "../../components/RiskModal";
import { parseUnits,formatUnits } from "ethers/lib/utils";
import { decimalToBalance } from "../../basis-cash/ether-utils";
const Coin: React.FC = () => {
  const isMobile = useIsMobile();
  const [messages] = useState(["risk_msg4"]);

  const [isOpen, setOpen] = useState(false);
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
  console.log(decimalToBalance("1", 18),formatUnits('1000000000000000000'));

  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (!localStorage.getItem("isCoinMsg")) {
      setOpen(true);
      localStorage.setItem("isCoinMsg", "isCoinMsg");
    }
  }, []);
  return (
    <div className="wing-blank-xl">
      <Tab tabs={tabs} tab={tab} onChangeTab={() => {}} />
      <Specie />
      {/* <Debt /> */}
      <RiskModal
        messages={messages}
        isOpen={isOpen}
        onDismiss={() => {
          console.log("?????");

          setOpen(false);
        }}
      />
    </div>
  );
};

export default Coin;
