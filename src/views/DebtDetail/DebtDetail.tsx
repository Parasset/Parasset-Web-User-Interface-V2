//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import Back from "../../components/Back";
import Info from "./components/Info";
import Handler from "./components/Handler";
import useDebt from "../../hooks/debt/useDebt";
import useDebtInfo from "../../hooks/debt/useDebtInfo";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();
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

export default Mine;
