//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import Back from "../../components/Back";
import MyInfo from "./components/MyInfo";
import FundInfo from "./components/FundInfo";
import useItank from "../../hooks/itank/useItank";
import useItankInfo from "../../hooks/itank/useItankInfo";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { itankId } = useParams();
  const itank = useItank(itankId);
  const { itankInfo } = useItankInfo(itank);
  return (
    <>
      <Back text={`USDT-PUSD  ${t("bxc")}`} img="USDT" img1="PUSD" />
      <div className="wing-blank-xl">
        <MyInfo />
        <FundInfo itankInfo={itankInfo} itank={itank} />
      </div>
    </>
  );
};

export default Mine;
