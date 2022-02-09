//@ts-nocheck
import React, {useEffect, useState} from "react";
import {useLocation, useHistory} from "react-router-dom";
import Tab from "../../components/Tab";
import {getQueryParam} from "../../utils/utils";
import Specie from "./components/Specie";
import Debt from "./components/Debt";
import RiskModal from "../../components/RiskModal";
import Spacer from "../../components/Spacer";

const Coin: React.FC = () => {
  const history = useHistory();
  const locationObj = useLocation();
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

  const [tab, setTab] = useState(1);

  useEffect(() => {
    if (locationObj && locationObj.search) {
      var tab = getQueryParam("tab", locationObj.search);
      setTab(parseInt(tab));
    }
  }, [locationObj]);

  useEffect(() => {
    if (!localStorage.getItem("isCoinMsg")) {
      setOpen(true);
      localStorage.setItem("isCoinMsg", "isCoinMsg");
    }
  }, []);
  return (
    <div className="wing-blank-xl1">
      <Tab
        tabs={tabs}
        tab={tab}
        // onChangeTab={setTab}
        onChangeTab={(tab) => {
          history.replace({path: "/coin", search: `?tab=${tab}`});
        }}
      />
      <Spacer/>
      {tab === 1 ? <Specie/> : <Debt/>}

      <RiskModal
        messages={messages}
        isOpen={isOpen}
        onDismiss={() => {

          setOpen(false);
        }}
      />
    </div>
  );
};

export default Coin;
