//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "light-toast";
import HandlerModal from "../../../components/HandlerModal";
import { getDep } from "../../../utils/utils";
import useStake from "../../../hooks/mine/useStake";
import useWithdraw from "../../../hooks/mine/useWithdraw";
import useBlur from "../../../hooks/useBlur";
import useFocus from "../../../hooks/useFocus";
import useApprove from "../../../hooks/useApprove";
import useBasisCash from "../../../hooks/useBasisCash";
const Mine: React.FC = ({
  isOpen,
  onDismiss,
  mine,
  select,
  depositBalance,
  stakeBalance,
  fetchInfo,
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState(0);
  const [pendingTx, setPendingTx] = useState(false);
  const { onStake } = useStake(mine?.depositToken?.address);
  const { onWithdraw } = useWithdraw(mine?.depositToken?.address);
  const { onBlur } = useBlur();
  const { onFocus } = useFocus();
  const basisCash = useBasisCash();
  const [approveStatus, approve] = useApprove(
    mine?.depositToken,
    basisCash?.contracts.Mine?.address,
    val
  );
  const canBuyAmount = useMemo(() => {
    return select === 1 ? depositBalance : stakeBalance;
  }, [depositBalance, select, stakeBalance]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t(select === 1 ? t("qsrdysl") : t("qsrshsl")), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 18) {
      Toast.info(
        t("zdsrws", {
          decimal: 18,
        }),
        1000
      );
    } else {
      setPendingTx(true);
      var func = select === 1 ? onStake : onWithdraw;
      const result = await func(val + "");
      setPendingTx(false);
      if (result !== "0") {
        fetchInfo && fetchInfo();
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 0);
      }
    }
  }, [onStake, onWithdraw, select, fetchInfo, val, canBuyAmount]);

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
        onBlur={(e) => {
          onBlur(e, setVal);
        }}
        onFocus={(e) => {
          onFocus(e, setVal);
        }}
        showApprove={select === 1}
        approveStatus={approveStatus}
        approve={async () => {
          setPendingTx(true);
          await approve();
          setPendingTx(false);
        }}
        approveTokenName={mine?.depositTokenName}
      />
    </>
  );
};

export default Mine;
