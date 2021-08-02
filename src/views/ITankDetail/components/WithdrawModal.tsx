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
import useFocus from "../../../hooks/useFocus";
import useApprove from "../../../hooks/useApprove";
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
  const { onFocus } = useFocus();
  const { onWithdraw } = useWithdraw(
    itank?.itankContract,
    itank?.itankContract?.decimal
  );


  const [approveStatus, approve] = useApprove(
    itank?.itankContract,
    itank?.itankContract?.address,
    val
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

  const estimateValue = useMemo(() => {
    //     提取保险的时候，提取金额X=输入的份额*净值；
    // 1、若X＜0（因为净值可能小于0），则预计可赎回的标的资产和平行资产都为0，点击“确定”时提示“保险池亏损，可提取资金为0” 英文提示：The loss of the insurance pool, and the available capital is 0
    // 2、若0≤X≤保险基金账户的标的资产数量，则预计提取的标的资产数量=X，预计提取的平行资产数量=0；点击“确定”可正常提取
    // 3、若X＞保险基金的标的资产数量，则预计提取的标的资产数量=保险基金中标的资产的数量；预计提取的平行资产数量=X-保险基金中标的资产数量；点击“确定”可正常提取
    const x = new BigNumber(itankInfo.perShare).times(val);
    return x
  }, [val, itankInfo]);

  const estimateWithdrawDepositToken = useMemo(() => {
    const value = estimateValue.lt(0)
      ? 0
      : estimateValue.lte(itankInfo.depositFundBalance)
      ? estimateValue.toNumber()
      : itankInfo.depositFundBalance;

    return value;
  }, [estimateValue, itankInfo.depositFundBalance]);

  const estimateWithdrawEarnToken = useMemo(() => {
    const value = estimateValue.lt(0)
      ? 0
      : estimateValue.lte(itankInfo.depositFundBalance)
      ? 0
      : estimateValue.minus(itankInfo.depositFundBalance).toNumber();
    return value;
  }, [estimateValue, itankInfo.depositFundBalance]);



  
  const remainingShare = useMemo(() => {
    // 持有的LP-提取LP-USD数量输入值
    let amount = new BigNumber(canBuyAmount).minus(val);
    return $isFiniteNumber(amount.toNumber());
  }, [val, canBuyAmount]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t("qsrzrsl"), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t("yebz"), 1000);
    } else if (getDep(val) > 18) {
      Toast.info(      t("zdsrws", {
        decimal: 18,
      }), 1000);
    } else if (itankInfo.perShare < 0) {
      Toast.info(t("bxcks"), 1000);
    } else {
      setPendingTx(true);
      //
      const result = await onWithdraw(val + "");
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onWithdraw, val, itankInfo.perShare, canBuyAmount]);

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
        onFocus={(e) => {
          onFocus(e, setVal);
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
            value: <Value value={estimateWithdrawDepositToken} showAll={true} />,
            unit: "",
            labelUnit: itank.depositTokenName,
          },
          estimateWithdrawEarnToken: {
            label: "yjtqpusd",
            value: <Value value={estimateWithdrawEarnToken} showAll={true} />,
            unit: "",
            labelUnit: itank.earnTokenName,
          },
          remaining: {
            label: "sypusd",
            labelUnit: `(${itank.LPTokenName})`,
            value: <Value value={remainingShare} showAll={true} />,
            unit: "",
          },
        }}
        type="number"




        showApprove={true}
        approveStatus={approveStatus}
        approve={async () => {
          setPendingTx(true);
          await approve();
          setPendingTx(false);
        }}
        approveTokenName={itank?.LPTokenName}
      />
    </>
  );
};

export default DepositModal;
