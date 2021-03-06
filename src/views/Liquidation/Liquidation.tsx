//@ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import BigValue from "../../components/BigValue";
import TableTitle from "../../components/TableTitle";
import TableList from "./components/TableList";
import Value from "../../components/Value";
import useParasset from "../../hooks/useParasset";
import useTokenBalance from "../../hooks/useTokenBalance";
import useLiquidationList from "../../hooks/debt/useLiquidationList";
import useLiquidatedAssets from "../../hooks/debt/useLiquidatedAssets";
import LiqModal from "./components/LiqModal";
const Liquidation: React.FC = () => {
  const { t } = useTranslation();
  const parasset = useParasset();
  const [isOpen, setIsOpen] = useState(false);
  const [selectKey, setSelectKey] = useState("ETHPUSD");
  const { list, loading, totalMortgageValue } = useLiquidationList();
  const liquidatedAssets = useLiquidatedAssets();
  const titles = [
    {
      text: "zhaicang",
      className: "flex1",
    },
    {
      text: "dqdyl",
      className: "flex1",
    },
    {
      text: "dyzc",
      className: "flex1",
    },
    {
      text: "zbzw",
      className: "flex1",
    },
    {
      text: "zdqsf",
      className: "flex15",
    },
  ];

  const onSelect = useCallback((itemKey) => {
    setSelectKey(itemKey);
  }, []);

  const select = useMemo(() => {
    const item = list.filter((item) => item.itemKey === selectKey);
    return item.length ? item[0] : {};
  }, [selectKey, list]);
  const PETHWalletBalance = useTokenBalance(parasset?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(parasset?.externalTokens["PUSD"]);
  const ETHWalletBalance = useTokenBalance(parasset?.externalTokens["ETH"]);
  return (
    <>
      <BigValue
        text={t("dqsqsjz")}
        color="#000"
        value={<Value value={totalMortgageValue} prefix="$" />}
      />
      <BigValue
        text={t("yqszcjz")}
        color="#000"
        value={<Value value={liquidatedAssets} prefix="$" />}
      />

      <TableTitle titles={titles} />
      <TableList
        list={list}
        onSelect={onSelect}
        loading={loading}
        openModal={() => setIsOpen(true)}
      />
      <LiqModal
        isOpen={isOpen}
        onDismiss={() => setIsOpen(false)}
        key={isOpen + "isOpen"}
        select={select}
        PETHWalletBalance={PETHWalletBalance}
        PUSDWalletBalance={PUSDWalletBalance}
        ETHWalletBalance={ETHWalletBalance}
      />
    </>
  );
};

export default Liquidation;
