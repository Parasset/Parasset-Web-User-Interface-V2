//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useIsMobile from "../../hooks/useIsMobile";
import Value from "../../components/Value";
import BigValue from "../../components/BigValue";
import List from "./components/List";
import RiskModal from "../../components/RiskModal";
import useItanks from "../../hooks/itank/useItanks";
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const itanks = useItanks();
  const [messages] = useState(["risk_msg1", "risk_msg2", "risk_msg3"]);

  const [isOpen, setOpen] = useState(false);

  // const [title] = useState("赎回 LP-USD");
  // const [title] = useState("增加抵押");
  // const [title] = useState("提取资产");
  // const [title] = useState("偿还债务");
  // const [title] = useState("铸币");
  // const [title] = useState("注入保险");
  // shuhui
  // zjdy
  // tqzc
  // chzw
  // zhubi
  // zrbx
  const [title] = useState("提取保险");
  // const [label] = useState("赎回数量");
  // const [label] = useState("抵押数量");
  // const [label] = useState("提取数量");
  // const [label] = useState("偿还数量");
  // const [label] = useState("铸币数量");
  // const [label] = useState("注入数量");
  // tqbx
  // shsl
  // dysl
  // tqsl
  // chsl
  // zbsl
  // zrsl
  const [label] = useState("提取数量");
  const [balanceTxt] = useState("可用");
  // const [balanceTxt] = useState("可铸币");
  // tqsl
  // keyong
  // kzb
  // const [columns] = useState({
  //   assetChanges: {
  //     label: "dyzcbgw",
  //     value: "345,240",
  //     unit: "NEST",
  //   },
  //   ratioChanges: {
  //     label: "dylbgw",
  //     value: "64",
  //     unit: "%",
  //   },
  //   liqChanges: {
  //     label: "qsjbgw",
  //     value: "1345",
  //     unit: "PUSD",
  //   },
  //   payFee: {
  //     label: "jnwdf",
  //     value: "4.41",
  //     unit: "PUSD",
  //   },
  // });
  // const [columns] = useState({
  //   debtChanges: {
  //     label: "zbzwbgw",
  //     value: "345,240",
  //     unit: "ETH",
  //   },
  //   ratioChanges: {
  //     label: "dylbgw",
  //     value: "64",
  //     unit: "%",
  //   },
  //   liqChanges: {
  //     label: "jnwdf",
  //     value: "1345",
  //     unit: "PUSD",
  //   },
  //   payFee: {
  //     label: "zbzwbgw",
  //     value: "4.41",
  //     unit: "PUSD",
  //   },
  //   oracleFee: {
  //     label: "yyjdyf",
  //     value: "0.01",
  //     unit: "ETH",
  //   },
  // });
  // const [columns] = useState({
  //   currentValue: {
  //     label: "dqjz",
  //     value: "1.234",
  //     unit: "",
  //   },
  //   estimateShare: {
  //     label: "yjfe",
  //     value: "64",
  //     unit: "",
  //   },

  // });
  const [columns] = useState({
    recentDay: {
      label: "zjtqr",
      value: "2021/02/22~2021/02/23",
      unit: "",
    },
    estimateWithdrawUSDT: {
      label: "yjtqusdt",
      value: "1.00",
      unit: "",
    },
    estimateWithdrawPUSD: {
      label: "yjtqpusd",
      value: "2.12",
      unit: "",
    },
    remaining: {
      label: "sypusd",
      value: "40",
      unit: "",
    },
  });

  useEffect(() => {
    if (!localStorage.getItem("isItankMsg")) {
      setOpen(true);
      localStorage.setItem("isItankMsg", "isItankMsg");
    }
  }, []);
  return (
    <>
      <BigValue
        text={`${t("bxc")} TVL`}
        color="#77A89A"
        value={<Value value={0} />}
      />

      <List itanks={itanks} />
      <RiskModal
        messages={messages}
        isOpen={isOpen}
        onDismiss={() => {
          
          setOpen(false);
        }}
      />
    </>
  );
};

export default Mine;
