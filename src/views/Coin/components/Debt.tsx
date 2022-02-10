//@ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import BigValue from "../../../components/BigValue";
import Value from "../../../components/Value";
import Depot from "./Depot";
import useCreatedDebts from "../../../hooks/debt/useCreatedDebts";
const Specie: React.FC = () => {
  const { t } = useTranslation();
  const {
    list,
    loading,
    mortgageValue,
    parassetValue,
  } = useCreatedDebts();

  const demoList = [{
    name: 'name',
    rate: '0.2',
    maxRatio: '0.4',
    liqRatio: '0.2',
    icon1: 'PETH',
    icon2: 'PUSD',
    mortgageAssets: '2',
    depositTokenName: 'ETH',
    mortgageValue: '0.2',
    earnTokenName: 'PUSD',
    parassetValue: '2',
    fee: '0.3',
    feeValue: '0.3',
    key: 'ETH',
  }]
  return (
    <>
      <BigValue
        text={t("dasz")}
        color="#000"
        value={<Value value={mortgageValue} prefix="$"/>}
      />
      <BigValue
        text={t("zwsz")}
        color="#000"
        value={<Value value={parassetValue} prefix="$"/>}
      />
      <Spacer size="sm" />
      <Depot list={demoList} loading={loading} />
    </>
  );
};

export default Specie;
