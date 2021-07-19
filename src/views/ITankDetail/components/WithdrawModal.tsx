//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import Toast from "light-toast";
import HandlerModal from "../../../components/HandlerModal";
import { getDep, $isFiniteNumber } from "../../../utils/utils";
import useStake from "../../../hooks/itank/useStake";
const DepositModal: React.FC = ({
  isOpen,
  onDismiss,
  itank,
  itankInfo,
  redeemAmount,
  lastDate,
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState("");
  const [pendingTx, setPendingTx] = useState(false);

  const { onStake } = useStake(
    itank?.itankContract,
    itank?.depositToken?.decimal
  );

  const canBuyAmount = useMemo(() => {
    const currentTime = new Date().getTime() / 1000;
    const {
      nextStartTimeNum,
      nextEndTimeNum,
      preStartTimeNum,
      preEndTimeNum,
    } = lastDate;
    const isTime =
      (currentTime >= preStartTimeNum && currentTime <= preEndTimeNum) ||
      (currentTime >= nextStartTimeNum && currentTime <= nextEndTimeNum);

    return isTime ? redeemAmount : 0;
  }, [redeemAmount, lastDate]);


  const estimateWithdrawDepositToken = useMemo(() => {

  }, [val, itankInfo]);

  const estimateWithdrawEarnTokenName = useMemo(() => {
   
  }, [val, itankInfo]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t("qsrzrsl"), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 14) {
      Toast.info(t("zdsrws"), 1000);
    } else {
      setPendingTx(true);

      const result = await onStake(val + "");
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onStake, val, canBuyAmount]);

  const handleSelectMax = useCallback(() => {
    setVal(canBuyAmount);
  }, [canBuyAmount, setVal]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const minLimit = 0;
      var { value } = e.currentTarget;
      var value1 = parseFloat(value);
      var canBuyAmount1 = parseFloat(canBuyAmount);

      value =
        value1 > canBuyAmount1
          ? canBuyAmount
          : value !== "" && value1 <= minLimit
          ? minLimit
          : value !== "" && !Number.isFinite(value1)
          ? minLimit
          : value;
      setVal(value);
    },
    [setVal, canBuyAmount]
  );

  return (
    <>
      <HandlerModal
        title={t("tqzc")}
        label={t("tqsl")}
        balanceTxt={t("ketiqu")}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={itank.icon1}
        icon2={itank.icon2}
        tokenName={itank.LPTokenName}
        placeholder={t("qsrtqsl")}
        max={redeemAmount}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        columns={{
          recentDay: {
            label: "zjtqr",
            value: "2021/02/22~2021/02/23",
            unit: "",
          },
          estimateWithdrawDepositToken: {
            label: "yjtqusdt",
            value: "1.00",
            unit: "",
            labelUnit: itank.depositTokenName,
          },
          estimateWithdrawEarnTokenName: {
            label: "yjtqpusd",
            value: "2.12",
            unit: "",
            labelUnit: itank.earnTokenName,
          },
          remaining: {
            label: "sypusd",
            value: "40",
            unit: "",
          },
        }}
        type="number"
      />
    </>
  );
};

export default DepositModal;
