//@ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import Value from "../../components/Value";
import BigValue from "../../components/BigValue";
import List from "./components/List";
import RiskModal from "../../components/RiskModal";
import useItanks from "../../hooks/itank/useItanks";
import useItankInfo from "../../hooks/itank/useItankInfo";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const itanks = useItanks();
  const [messages] = useState(["risk_msg1", "risk_msg2", "risk_msg3"]);

  const [isOpen, setOpen] = useState(false);
  const { itankInfo: itankInfo1 } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: itankInfo2 } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
  const totalItankValue = useMemo(() => {
    //保险池内资产两种币的总和换成USDT
    let tvl1 = new BigNumber(itankInfo1.depositFundValue).plus(
      itankInfo1.earnFundValue
    );
    let tvl2 = new BigNumber(itankInfo2.depositFundValue).plus(
      itankInfo2.earnFundValue
    );
    tvl1 = $isPositiveNumber($isFiniteNumber(tvl1.toNumber()));
    tvl2 = $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(tvl1).plus(tvl2).toNumber())
    );
  }, [
    itankInfo1.depositFundValue,
    itankInfo1.earnFundValue,
    itankInfo2.depositFundValue,
    itankInfo2.earnFundValue,
  ]);

  useEffect(() => {
    if (!localStorage.getItem("isItankMsg")) {
      setOpen(true);
      localStorage.setItem("isItankMsg", "isItankMsg");
    }
  }, []);
  return (
    <>
      <BigValue
        text={`${t("bxc")} TVL`}
        color="#000"
        value={<Value value={totalItankValue} prefix="$" />}
      />

      <List itanks={itanks} />
      <RiskModal
        messages={messages}
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Mine;
