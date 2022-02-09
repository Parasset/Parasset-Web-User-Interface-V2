//@ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Back from "../../components/Back";
import Info from "./components/Info";
import Handler from "./components/Handler";
import useDebt from "../../hooks/debt/useDebt";
import useDebtInfo from "../../hooks/debt/useDebtInfo";

const DebtDetail: React.FC = () => {
  const { t } = useTranslation();
  const { debtId } = useParams();
  const debt = useDebt(debtId);
  const { info: debtInfo,fetchInfo } = useDebtInfo(debt);
  return (
    <>
      <Back
        text={`${debt?.name} ${t('zhaicang')} `}
        img={debt.icon1}
        img1={debt.icon2}
      />
      <Info debt={debt} debtInfo={debtInfo} fetchInfo={fetchInfo} />
      <Handler debt={debt} debtInfo={debtInfo} />
    </>
  );
};

export default DebtDetail;
