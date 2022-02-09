//@ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "light-toast";
import Value from "../../../components/Value";
import HandlerModal from "../../../components/HandlerModal";
import BigNumber from "bignumber.js";
import { getDep, $isFiniteNumber } from "../../../utils/utils";
import useStake from "../../../hooks/itank/useStake";
import useBlur from "../../../hooks/useBlur";
import useFocus from "../../../hooks/useFocus";
import useApprove from "../../../hooks/useApprove";
const DepositModal: React.FC = ({
  isOpen,
  onDismiss,
  itank,
  itankInfo,
  depositBalance,
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState(0);
  const [pendingTx, setPendingTx] = useState(false);
  const [approveStatus, approve] = useApprove(
    itank?.depositToken,
    itank?.itankContract?.address,
    val
  );
  const { onBlur } = useBlur();
  const { onFocus } = useFocus();
  const { onStake } = useStake(
    itank?.itankContract,
    itank?.depositToken?.decimal
  );

  const canBuyAmount = useMemo(() => {
    return depositBalance;
  }, [depositBalance]);

  const estimateShare = useMemo(() => {
    let estimateShare = parseFloat(val / itankInfo.perShare);
    return $isFiniteNumber(estimateShare);
  }, [val, itankInfo.perShare]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t("qsrzrsl"), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 18) {
      Toast.info(
        t("zdsrws", {
          decimal: 18,
        }),
        1000
      );
    } else if (itankInfo.perShare < 0) {
      Toast.info(t("dqjzxybnzr"), 1000);
    } else {
      setPendingTx(true);

      const result = await onStake(val + "", itank.depositTokenName === "ETH");
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onStake, val, canBuyAmount, itankInfo.perShare, itank.depositTokenName]);

  const handleSelectMax = useCallback(() => {
    if (itank.depositTokenName === "ETH") {
      const amount = new BigNumber(canBuyAmount);
      let val = amount.minus(0.01).toFixed(getDep(amount), 1);
      setVal(val < 0 ? 0 : val);
    } else {
      setVal(canBuyAmount);
    }
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
        title={t("zrbx")}
        label={t("zrsl")}
        balanceTxt={t("keyong")}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={itank.icon1}
        // icon2={itank.icon2}
        tokenName={itank.depositTokenName}
        placeholder={t("qsrzrsl")}
        max={depositBalance}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        onBlur={(e) => {
          onBlur(e, setVal);
        }}
        onFocus={(e) => {
          onFocus(e, setVal);
        }}
        columns={{
          currentValue: {
            label: "dqjz",
            value: (
              <Value
                value={itankInfo.perShare}
                decimals={6}
                placeholder={true}
              />
            ),
            unit: "",
          },
          estimateShare: {
            label: "yjfe",
            value: <Value value={estimateShare} decimals={6} />,
            unit: "",
          },
        }}
        type="number"
        showApprove={itank.depositTokenName !== "ETH"}
        approveStatus={approveStatus}
        approve={async () => {
          setPendingTx(true);
          await approve();
          setPendingTx(false);
        }}
        approveTokenName={itank?.depositTokenName}
      />
    </>
  );
};

export default DepositModal;
