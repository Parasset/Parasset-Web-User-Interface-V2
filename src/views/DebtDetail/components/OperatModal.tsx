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
import useApprove from "../../../hooks/useApprove";
import useHandlerDebt from "../../../hooks/debt/useHandlerDebt";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useBasisCash from "../../../hooks/useBasisCash";
import useBlur from "../../../hooks/useBlur";
const Mine: React.FC = ({ isOpen, onDismiss, debt, select, debtInfo, max }) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const [val, setVal] = useState("");

  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const [pendingTx, setPendingTx] = useState(false);
  const { onHandlerDebt } = useHandlerDebt();
  const { onBlur } = useBlur();
  const [approveStatus, approve] = useApprove(
    debt?.uToken,
    debt?.mortgagePoolContract?.address
  );
  const canBuyAmount = useMemo(() => {
    return max;
  }, [max]);

  const assetChanges = useMemo(() => {
    if (select === "Stake") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.mortgageAssets).plus(val).toNumber()
        )
      );
    } else if (select === "Redeem") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.mortgageAssets).minus(val).toNumber()
        )
      );
    } else if (select === "Mint") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets).plus(val).toNumber()
        )
      );
    } else if (select === "Repay") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets).minus(val).toNumber()
        )
      );
    }
  }, [select, val, debtInfo]);

  const ratioChanges = useMemo(() => {
    if (select === "Stake") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(
              new BigNumber(debtInfo.mortgageAssets)
                .plus(val)
                .times(debtInfo.mortgageToParassetPrice)
            )

            .toNumber()
        )
      );
    } else if (select === "Redeem") {
      $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(
              new BigNumber(debtInfo.mortgageAssets)
                .minus(val)
                .times(debtInfo.mortgageToParassetPrice)
            )

            .toNumber()
        )
      );
    } else if (select === "Mint") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .plus(val)
            .div(
              new BigNumber(debtInfo.mortgageAssets).times(
                debtInfo.mortgageToParassetPrice
              )
            )
            .toNumber()
        )
      );
    } else if (select === "Repay") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .minus(val)
            .div(
              new BigNumber(debtInfo.mortgageAssets).times(
                debtInfo.mortgageToParassetPrice
              )
            )
            .toNumber()
        )
      );
    }
  }, [select, val, debtInfo]);

  const liqChanges = useMemo(() => {
    if (select === "Stake") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(new BigNumber(debtInfo.mortgageAssets).plus(val))
            .times(debtInfo.liqRatio)
            .toNumber()
        )
      );
    } else if (select === "Redeem") {
      $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(new BigNumber(debtInfo.mortgageAssets).minus(val))
            .times(debtInfo?.liqRatio)
            .toNumber()
        )
      );
    } else if (select === "Mint") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .plus(val)
            .div(
              new BigNumber(debtInfo.mortgageAssets).times(debtInfo?.liqRatio)
            )
            .toNumber()
        )
      );
    } else if (select === "Repay") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .minus(val)
            .div(
              new BigNumber(debtInfo.mortgageAssets).times(debtInfo?.liqRatio)
            )
            .toNumber()
        )
      );
    }
  }, [select, val, debtInfo]);

  const columns = useMemo(() => {
    const columnsLeft = {
      assetChanges: {
        label: "dyzcbgw",
        value: <Value value={assetChanges} />,
        unit: debt.depositTokenName,
      },
      ratioChanges: {
        label: "dylbgw",
        value: <Value value={ratioChanges} />,
        unit: "%",
      },
      liqChanges: {
        label: "qsjbgw",
        value: <Value value={liqChanges} />,

        unit: debt.liqUnit,
      },
      payFee: {
        label: "jnwdf",
        value: <Value value={debtInfo.fee} />,
        unit: debt.earnTokenName,
      },
      oracleFee: {
        label: "yyjdyf",
        value: "0.01",
        unit: "ETH",
        isTooltip: true,
        tip: "tip2",
      },
    };
    const columnsRight = {
      assetChanges: {
        label: "zbzwbgw",
        value: <Value value={assetChanges} />,
        unit: debt.earnTokenName,
      },
      ratioChanges: {
        label: "dylbgw",
        value: <Value value={ratioChanges} />,
        unit: "%",
      },
      liqChanges: {
        label: "qsjbgw",
        value: <Value value={liqChanges} />,
        unit: debt.liqUnit,
      },
      payFee: {
        label: "jnwdf",
        value: <Value value={debtInfo.fee} />,
        unit: debt.earnTokenName,
      },
      oracleFee: {
        label: "yyjdyf",
        value: "0.01",
        unit: "ETH",
        isTooltip: true,
        tip: "tip2",
      },
    };
    const columns = {
      Stake: columnsLeft,
      Redeem: columnsLeft,
      Repay: columnsRight,
      Mint: columnsRight,
    };
    return columns[select];
  }, [select, debt, assetChanges, debtInfo, ratioChanges]);

  const dataInfo = useMemo(() => {
    return {
      Stake: {
        title: "zjdy",
        label: "dysl",
        icon: debt.icon1,
        depositTokenName: debt.depositTokenName,
        placeholder: "qsrdysl",
        balanceTxt: "keyong",
        exceededTip: "qbzckyyebz",
        columns,
      },
      Redeem: {
        title: "tqzc",
        label: "tqsl",
        icon: debt.icon1,
        depositTokenName: debt.depositTokenName,
        placeholder: "qsrshsl",
        balanceTxt: "ketiqu",
        exceededTip: "cgzdktqsl",
        columns,
      },
      Repay: {
        title: "chzw",
        label: "chsl",
        icon: debt.icon2,
        depositTokenName: debt.earnTokenName,
        placeholder: "qsrchsl",
        balanceTxt: "keyong",
        exceededTip: "cgzdkchsl",
        columns,
      },
      Mint: {
        title: "zhubi",
        label: "zbsl",
        icon: debt.icon2,
        depositTokenName: debt.earnTokenName,
        placeholder: "qsrzbsl",
        balanceTxt: "kzb",
        exceededTip: "cgzdkzbsl",
        columns,
      },
    };
  }, [debt, assetChanges, columns]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(val)) {
      Toast.info(t(dataInfo[select].placeholder), 1000);
    } else if (parseFloat(val) > parseFloat(canBuyAmount)) {
      Toast.info(t(dataInfo[select].exceededTip), 1000);
    } else if (parseFloat(ETHWalletBalance) < 0.01) {
      Toast.info(t("qbkyethbz"), 1000);
    } else if (getDep(val) > 14) {
      Toast.info(t("zdsrws"), 1000);
    } else {
      setPendingTx(true);
      const result = await onHandlerDebt(
        debt.mortgagePoolContract,
        debt.mortgageToken,
        val,
        select
      );
      setPendingTx(false);
      if (result !== "0") {
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [onHandlerDebt, select, val, ETHWalletBalance, canBuyAmount, dataInfo]);

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
        title={t(dataInfo[select].title)}
        label={t(dataInfo[select].label)}
        balanceTxt={t(dataInfo[select].balanceTxt)}
        isOpen={isOpen}
        onDismiss={onDismiss}
        icon1={dataInfo[select].icon}
        tokenName={dataInfo[select].depositTokenName}
        placeholder={t(dataInfo[select].placeholder)}
        max={max}
        handleChange={handleChange}
        onSelectMax={handleSelectMax}
        onConfirm={onConfirm}
        disabled={pendingTx}
        val={val}
        type="number"
        columns={dataInfo[select].columns}
        showApprove={true}
        approveStatus={approveStatus}
        approve={async () => {
          setPendingTx(true);
          await approve();
          setPendingTx(false);
        }}
        approveTokenName={debt?.earnTokenName}
        onBlur={(e) => {
          onBlur(e, setVal);
        }}
      />
    </>
  );
};

export default Mine;
