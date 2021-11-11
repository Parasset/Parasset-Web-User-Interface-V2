//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import BigValue from "../../components/BigValue";
import TableTitle from "../../components/TableTitle";
import TableList from "./components/TableList";
import Value from "../../components/Value";

import useLiquidationList from "../../hooks/debt/useLiquidationList";
import LiqModal from "./components/LiqModal";
const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectKey, setSelectKey] = useState("ETHPUSD");
  const { list, loading, totalMortgageValue } = useLiquidationList();
  const [titles, setTitles] = useState([
    "zhaicang",
    "dqdyl",
    "dyzc",
    "zbzw",
    "zdqsf",
  ]);

  const onSelect = useCallback((key) => {
    setSelectKey(key);
  }, []);

  const select = useMemo(() => {
    const item = list.filter((item) => item.key === selectKey);
    return item.length ? item[0] : {};
  }, [selectKey, list]);


  return (
    <>
      <BigValue
        text={t("dqsqsjz")}
        color="#DD8751"
        value={<Value value={totalMortgageValue} prefix="$" />}
      />
      <BigValue
        text={t("yqszcjz")}
        color="#77A89A"
        value={<Value value={0} prefix="$" />}
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
      />
    </>
  );
};

export default Home;
