//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Toast from "light-toast";
import HandlerModal from "../../../components/HandlerModal";
import { getDep } from "../../../utils/utils";
// import useStake from "../../../hooks/mine/useStake";
// import useWithdraw from "../../../hooks/mine/useWithdraw";
const Mine: React.FC = ({
  isOpen,
  onDismiss,
  debt,
  select,
  debtInfo
  
}) => {
  const { t } = useTranslation();
  const [val, setVal] = useState("");

  const [pendingTx, setPendingTx] = useState(false);
  // const { onStake } = useStake(mine?.depositToken?.address);
  // const { onWithdraw } = useWithdraw(mine?.depositToken?.address);

  const canBuyAmount = useMemo(
    () => {
      // return select === 1 ? depositBalance : stakeBalance;
    },
    [
      // depositBalance, select, stakeBalance
    ]
  );

  const dataInfo = useMemo(
    () => {
      return {
        Stake: {
          title: "zjdy",
          label: "dysl",
          icon:debt.icon1,
          depositTokenName:debt.depositTokenName,
          placeholder:'qsrdysl',
          columns: {
            assetChanges: {
              label: "dyzcbgw",
              value: "345,240",
              unit: "NEST",
            },
            ratioChanges: {
              label: "dylbgw",
              value: "64",
              unit: "%",
            },
            liqChanges: {
              label: "qsjbgw",
              value: "1345",
              unit: "PUSD",
            },
            payFee: {
              label: "jnwdf",
              value: "4.41",
              unit: "PUSD",
            },
            oracleFee: {
              label: "yyjdyf",
              value: "0.01",
              unit: "ETH",
            },
          },
        },
        Redeem: {
          title: "tqzc",
          label: "tqsl",
          icon:debt.icon1,
          depositTokenName:debt.depositTokenName,
          placeholder:'qsrshsl',
          columns: {
            assetChanges: {
              label: "dyzcbgw",
              value: "345,240",
              unit: "NEST",
            },
            ratioChanges: {
              label: "dylbgw",
              value: "64",
              unit: "%",
            },
            liqChanges: {
              label: "qsjbgw",
              value: "1345",
              unit: "PUSD",
            },
            payFee: {
              label: "jnwdf",
              value: "4.41",
              unit: "PUSD",
            },
            oracleFee: {
              label: "yyjdyf",
              value: "0.01",
              unit: "ETH",
            },
          },
        },
        Repay: {
          title: "chzw",
          label: "chsl",
          icon:debt.icon2,
          depositTokenName:debt.earnTokenName,
          placeholder:'qsrchsl',
          columns: {
            assetChanges: {
              label: "dyzcbgw",
              value: "345,240",
              unit: "NEST",
            },
            ratioChanges: {
              label: "dylbgw",
              value: "64",
              unit: "%",
            },
            liqChanges: {
              label: "qsjbgw",
              value: "1345",
              unit: "PUSD",
            },
            payFee: {
              label: "jnwdf",
              value: "4.41",
              unit: "PUSD",
            },
            oracleFee: {
              label: "yyjdyf",
              value: "0.01",
              unit: "ETH",
            },
          },
        },
        Mint: {
          title: "zhubi",
          label: "zbsl",
          icon:debt.icon2,
          depositTokenName:debt.earnTokenName,
          placeholder:'qsrzbsl',
          columns: {
            assetChanges: {
              label: "dyzcbgw",
              value: "345,240",
              unit: "NEST",
            },
            ratioChanges: {
              label: "dylbgw",
              value: "64",
              unit: "%",
            },
            liqChanges: {
              label: "qsjbgw",
              value: "1345",
              unit: "PUSD",
            },
            payFee: {
              label: "jnwdf",
              value: "4.41",
              unit: "PUSD",
            },
            oracleFee: {
              label: "yyjdyf",
              value: "0.01",
              unit: "ETH",
            },
          },
        },
      };
    },
    [
      debt
      // depositBalance, select, stakeBalance
    ]
  );

  const onConfirm = useCallback(
    async () => {
      // if (!parseFloat(val)) {
      //   Toast.info(t(select === 1 ? t("qsrdysl") : t("qsrshsl")), 1000);
      // } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      //   Toast.info(t("yebz"), 1000);
      // } else if (getDep(val) > 14) {
      //   Toast.info(t("zdsrws"), 1000);
      // } else {
      //   setPendingTx(true);
      //   var func = select === 1 ? onStake : onWithdraw;
      //   const result = await func(val + "");
      //   setPendingTx(false);
      //   if (result !== "0") {
      //     setTimeout(() => {
      //       setVal("");
      //       onDismiss();
      //     }, 1000);
      //   }
      // }
    },
    [
      // onStake, onWithdraw, select, val, canBuyAmount
    ]
  );

  const handleSelectMax = useCallback(() => {
    // setVal(canBuyAmount);
  }, [canBuyAmount, setVal]);

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      // const minLimit = 0;
      // var { value } = e.currentTarget;
      // var value1 = parseFloat(value);
      // var canBuyAmount1 = parseFloat(canBuyAmount);
      // value =
      //   value1 > canBuyAmount1
      //     ? canBuyAmount
      //     : value !== "" && value1 <= minLimit
      //     ? minLimit
      //     : value !== "" && !Number.isFinite(value1)
      //     ? minLimit
      //     : value;
      // setVal(value);
    },
    [
      // setVal, canBuyAmount
    ]
  );
  return (
    <>
   
      <HandlerModal
        title={
          t(dataInfo[select]).title
        }
        label={  t(dataInfo[select]).label}
        balanceTxt={t("keyong")}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={ t(dataInfo[select]).icon}
        tokenName={ t(dataInfo[select]).depositTokenName}
        placeholder={t(dataInfo[select]).placeholder}
        max={
          canBuyAmount}
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
