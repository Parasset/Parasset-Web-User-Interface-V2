//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import HandlerModal from "../../../components/HandlerModal";
import { getDep } from "../../../utils/utils";
import useStake from "../../../hooks/useStake";
import useWithdraw from "../../../hooks/useWithdraw";
const Mine: React.FC = ({
  isOpen,
  onDismiss,
  mine,
  select,
  depositBalance,
  stakeBalance,
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState("");
  const [pendingTx, setPendingTx] = useState(false);
  const { onStake } = useStake(mine?.depositToken?.address);
  const { onWithdraw } = useWithdraw(mine?.depositToken?.address);

  const canBuyAmount = useMemo(() => {
    return select === 1 ? depositBalance : stakeBalance;
  }, [depositBalance, select, stakeBalance]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t(select === 1 ? t("qsrdysl") : t("qsrshsl")), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 14) {
      Toast.info(t("zdsrws"), 1000);
    } else {
      setPendingTx(true);
      var func = select === 1 ? onStake : onWithdraw;
      const result = await func(val + "");
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onStake, onWithdraw, select, val, canBuyAmount]);

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
        title={
          select === 1
            ? ` ${t("diya")} ${mine.depositTokenName} `
            : ` ${t("shuhui")} ${mine.depositTokenName} `
        }
        label={select === 1 ? t("dysl") : t("shsl")}
        balanceTxt={t("keyong")}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={mine.icon1}
        icon2={mine.icon2}
        tokenName={mine.depositTokenName}
        placeholder={select === 1 ? t("qsrdysl") : t("qsrshsl")}
        max={select === 1 ? depositBalance : stakeBalance}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        type="number"
      />
    </>
  );
};

export default Mine;
