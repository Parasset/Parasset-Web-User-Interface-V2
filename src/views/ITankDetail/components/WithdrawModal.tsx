//@ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import Toast from "light-toast";
import Value from "../../../components/Value";
import HandlerModal from "../../../components/HandlerModal";
import { getDep, $isFiniteNumber } from "../../../utils/utils";
import useWithdraw from "../../../hooks/itank/useWithdraw";
import useBlur from "../../../hooks/useBlur";
const DepositModal: React.FC = ({
  isOpen,
  onDismiss,
  itank,
  itankInfo,
  redeemAmount,
  lastDate,
  myShare,
  myRatio,
  totalFund,
  myAssets,
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState(0);
  const [pendingTx, setPendingTx] = useState(false);
  const { onBlur } = useBlur();
  const { onWithdraw } = useWithdraw(
    itank?.itankContract,
    itank?.itankContract?.decimal
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

  const recentDate = useMemo(() => {
    const currentTime = new Date().getTime() / 1000;
    const {
      nextStartTime,
      nextEndTime,
      preStartTime,
      preEndTime,
      nextStartTimeNum,
      nextEndTimeNum,
      preStartTimeNum,
      preEndTimeNum,
    } = lastDate;

    if (currentTime >= preStartTimeNum && currentTime <= preEndTimeNum) {
      return {
        startTime: preStartTime,
        endTime: preEndTime,
      };
    } else if (
      currentTime >= nextStartTimeNum &&
      currentTime <= nextEndTimeNum
    ) {
      return {
        startTime: nextStartTime,
        endTime: nextEndTime,
      };
    } else {
      return {
        startTime: nextStartTime,
        endTime: nextEndTime,
      };
    }
  }, [redeemAmount, lastDate]);

  const estimateWithdrawDepositToken = useMemo(() => {
    // 预计赎回的USDT数量=(提取LP-USD数量输入值/持有的LP-USDT数量)*我的保险中USDT的数量
    let amount = new BigNumber(val).div(myShare).times(myAssets?.depositAssets);
    return $isFiniteNumber(amount.toNumber());
  }, [val, myShare, myAssets]);

  const estimateWithdrawEarnToken = useMemo(() => {
    // 预计赎回的PUSD数量=(提取LP-USD数量输入值/持有的LP-USDT数量)*我的保险中PUSD的数量
    let amount = new BigNumber(val).div(myShare).times(myAssets?.earnAssets);
    return $isFiniteNumber(amount.toNumber());
  }, [val, myShare, myAssets]);

  const remainingShare = useMemo(() => {
    // 持有的LP-提取LP-USD数量输入值
    let amount = new BigNumber(myShare).minus(val);
    return $isFiniteNumber(amount.toNumber());
  }, [val, myShare]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t("qsrzrsl"), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 18) {
      Toast.info(t("zdsrws"), 1000);
    } else {
      setPendingTx(true);

      const result = await onWithdraw(val + "");
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onWithdraw, val, canBuyAmount]);

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
        max={canBuyAmount}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        onBlur={(e) => {
          onBlur(e, setVal);
        }}
        columns={{
          recentDay: {
            label: "zjtqr",
            value: (
              <div>
                <div>{recentDate.startTime}</div>
                <div>{recentDate.endTime}</div>
              </div>
            ),
            unit: "",
          },
          estimateWithdrawDepositToken: {
            label: "yjtqusdt",
            value: <Value value={estimateWithdrawDepositToken} decimals={4} />,
            unit: "",
            labelUnit: itank.depositTokenName,
          },
          estimateWithdrawEarnToken: {
            label: "yjtqpusd",
            value: <Value value={estimateWithdrawEarnToken} decimals={4} />,
            unit: "",
            labelUnit: itank.earnTokenName,
          },
          remaining: {
            label: "sypusd",
            value: <Value value={remainingShare} decimals={4} />,
            unit: itank.LPTokenName,
          },
        }}
        type="number"
      />
    </>
  );
};

export default DepositModal;
