//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import List from "./components/List";
import StatusModal from "../../components/StatusModal";
import RiskModal from "../../components/RiskModal";
import WalletModal from "../../components/WalletModal";
import HandlerModal from "../../components/HandlerModal";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  // const [title] = useState("赎回 LP-USD");
  // const [title] = useState("增加抵押");
  // const [title] = useState("提取资产");
  // const [title] = useState("偿还债务");
  // const [title] = useState("铸币");
  // const [title] = useState("注入保险");
  const [title] = useState("提取保险");
  // const [label] = useState("赎回数量");
  // const [label] = useState("抵押数量");
  // const [label] = useState("提取数量");
  // const [label] = useState("偿还数量");
  // const [label] = useState("铸币数量");
  // const [label] = useState("注入数量");
  const [label] = useState("提取数量");
  const [balanceTxt] = useState("可用");
  // const [balanceTxt] = useState("可铸币");
  // const [columns] = useState({
  //   assetChanges: {
  //     label: "抵押资产变更为",
  //     value: "345,240",
  //     unit: "NEST",
  //   },
  //   ratioChanges: {
  //     label: "抵押率变更为",
  //     value: "64",
  //     unit: "%",
  //   },
  //   liqChanges: {
  //     label: "清算价变更为",
  //     value: "1345",
  //     unit: "PUSD",
  //   },
  //   payFee: {
  //     label: "缴纳稳定费",
  //     value: "4.41",
  //     unit: "PUSD",
  //   },
  // });
  // const [columns] = useState({
  //   debtChanges: {
  //     label: "铸币债务变更为",
  //     value: "345,240",
  //     unit: "ETH",
  //   },
  //   ratioChanges: {
  //     label: "抵押率变更为",
  //     value: "64",
  //     unit: "%",
  //   },
  //   liqChanges: {
  //     label: "清算价变更为",
  //     value: "1345",
  //     unit: "PUSD",
  //   },
  //   payFee: {
  //     label: "缴纳稳定费",
  //     value: "4.41",
  //     unit: "PUSD",
  //   },
  //   oracleFee: {
  //     label: "预言机调用费",
  //     value: "0.01",
  //     unit: "ETH",
  //   },
  // });
  // const [columns] = useState({
  //   currentValue: {
  //     label: "当前净值",
  //     value: "1.234",
  //     unit: "",
  //   },
  //   estimateShare: {
  //     label: "预计份额",
  //     value: "64",
  //     unit: "",
  //   },

  // });
  const [columns] = useState({
    recentDay: {
      label: "最近提取日",
      value: "2021/02/22~2021/02/23",
      unit: "",
    },
    estimateWithdrawUSDT: {
      label: "预计提取USDT",
      value: "1.00",
      unit: "",
    },
    estimateWithdrawPUSD: {
      label: "预计提取PUSD",
      value: "2.12",
      unit: "",
    },
    remaining: {
      label: "剩余PUSD",
      value: "40",
      unit: "",
    },

  });

  return (
    <>
      <BigValue text="保险池 TVL" />

      <List />
      {/* <StatusModal /> */}
      {/* <RiskModal /> */}
      {/* <WalletModal /> */}
      <HandlerModal
        title={title}
        label={label}
        balanceTxt={balanceTxt}
        columns={columns}
      />
    </>
  );
};

export default Mine;
