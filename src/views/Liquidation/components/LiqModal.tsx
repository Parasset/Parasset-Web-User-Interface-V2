//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";

import Toast from "light-toast";
import HandlerModal from "../../../components/HandlerModal";
import Value from "../../../components/Value";
import {
  getDep,
  $isFiniteNumber,
  $isPositiveNumber,
} from "../../../utils/utils";

import { getNumberToFixed } from "../../../utils/formatBalance";
import useApprove from "../../../hooks/useApprove";
import useLiquidation from "../../../hooks/debt/useLiquidation";

import useBlur from "../../../hooks/useBlur";
import useFocus from "../../../hooks/useFocus";
const LiqModal: React.FC = ({ isOpen, onDismiss, select }) => {
  console.log("🚀 ~ file: LiqModal.tsx ~ line 22 ~ select", select);
  const { t } = useTranslation();

  const [val, setVal] = useState(0);

  const [pendingTx, setPendingTx] = useState(false);
  const { onLiquidation } = useLiquidation();
  const { onBlur } = useBlur();
  const { onFocus } = useFocus();

  const [approveParassetTokenStatus, approveParassetToken] = useApprove(
    select?.uToken,
    select?.mortgagePoolContract?.address,
    val
  );

  const max = useMemo(() => {
    return select.totalMortgageAssets;
  }, [select.totalMortgageAssets]);

  const canBuyAmount = useMemo(() => {
    return max;
  }, [max]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t("qsrsxqsdzcsl"), 1000);
    } else if (parseFloat(val) > parseFloat(max)) {
      Toast.info(t("可用清算余额不足"), 1000);
    } 
    else if (parseFloat(val) > parseFloat(0.001+0.025)) {
      Toast.info(t("可用清算余额不足"), 1000);
    } 
  }, [val]);

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

  const onSelectPercentage = useCallback(
    (percentage) => {
      const value = $isPositiveNumber(
        $isFiniteNumber(getNumberToFixed(new BigNumber(max).times(percentage)))
      );
      setVal(value);
    },
    [max, setVal]
  );

  return (
    <>
      <HandlerModal
        title={t("qingsuan")}
        label={t("qsdyzcsl")}
        balanceTxt={t("kqs")}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={select.depositTokenName}
        tokenName={select.depositTokenName}
        placeholder={t("qsrsxqsdzcsl")}
        max={max}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        showSelectPercentage={true}
        type="number"
        columns={{
          expectedObtain: {
            label: "yjhd",
            value: <Value value={$isPositiveNumber($isFiniteNumber(val))} />,
            unit: select.depositTokenName,
          },
          requiredPayment: {
            label: "sxzf",
            value: (
              <Value
                value={$isPositiveNumber(
                  $isFiniteNumber(
                    getNumberToFixed(new BigNumber(val).times(0.9))
                  )
                )}
              />
            ),
            unit: select.earnTokenName,
          },
        }}
        onSelectPercentage={onSelectPercentage}
        showApprove={true}
        approveStatus={approveParassetTokenStatus}
        approve={async () => {
          setPendingTx(true);
          await approveParassetToken();
          setPendingTx(false);
        }}
        approveTokenName={select.earnTokenName}
        onBlur={(e) => {
          onBlur(e, setVal);
        }}
        onFocus={(e) => {
          onFocus(e, setVal);
        }}
      />
    </>
  );
};

export default LiqModal;
