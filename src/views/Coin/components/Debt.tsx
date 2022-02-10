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
  const { list, loading, mortgageValue, parassetValue } = useCreatedDebts();

  return (
    <>
      <BigValue
        text={t("dasz")}
        color="#000"
        value={<Value value={mortgageValue} prefix="$" />}
      />
      <BigValue
        text={t("zwsz")}
        color="#000"
        value={<Value value={parassetValue} prefix="$" />}
      />
      <Spacer size="sm" />
      <Depot list={list} loading={loading} />
    </>
  );
};

export default Specie;
