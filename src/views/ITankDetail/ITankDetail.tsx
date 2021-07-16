//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  getNumberToMax,
  getNumberToAll,
  getDisplayNumber,
} from "../../utils/formatBalance";
import useIsMobile from "../../hooks/useIsMobile";
import Back from "../../components/Back";
import MyInfo from "./components/MyInfo";
import FundInfo from "./components/FundInfo";
import useItank from "../../hooks/itank/useItank";
import useItankInfo from "../../hooks/itank/useItankInfo";
import useTokenBalance from "../../hooks/useTokenBalance";
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { itankId } = useParams();
  const itank = useItank(itankId);
  const { itankInfo } = useItankInfo(itank);
  const myShare = useTokenBalance(itank?.itankContract);
  return (
    <>
      <Back
        text={`${itank?.name} LP ${t("kuangchi")} `}
        img={itank.icon1}
        img1={itank.icon2}
      />
      <div className="wing-blank-xl">
        <MyInfo itankInfo={itankInfo} itank={itank} myShare={myShare} />
        <FundInfo itankInfo={itankInfo} itank={itank} />
      </div>
    </>
  );
};

export default Mine;
