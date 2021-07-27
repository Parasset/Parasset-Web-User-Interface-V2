//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import BigValue from "../../../components/BigValue";
import Value from "../../../components/Value";
import Depot from "./Depot";
import useCreatedDebts from "../../../hooks/debt/useCreatedDebts";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const {
    list,
    loading,
    totalMortgageValue,
    totalParassetValue,
  } = useCreatedDebts();
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <BigValue
        text={t("dasz")}
        color="#DD8751"
        value={<Value value={totalMortgageValue} prefix="$"/>}
      />
      <BigValue
        text={t("zwsz")}
        color="#77A89A"
        value={<Value value={totalParassetValue} prefix="$"/>}
      />
      <Spacer size="sm" />
      <Depot list={list} loading={loading} />
    </>
  );
};

export default Specie;
