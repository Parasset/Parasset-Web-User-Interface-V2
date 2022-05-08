//@ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
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
import useHandlerDebt from "../../../hooks/debt/useHandlerDebt";

import useBlur from "../../../hooks/useBlur";
import useFocus from "../../../hooks/useFocus";
const Mine: React.FC = ({
  isOpen,
  onDismiss,
  debt,
  select,
  debtInfo,
  max,
  parassetBalance,
  ETHWalletBalance,
  fetchInfo,
}) => {
  const { t } = useTranslation();

  const [val, setVal] = useState(0);

  const [pendingTx, setPendingTx] = useState(false);
  const { onHandlerDebt } = useHandlerDebt();
  const { onBlur } = useBlur();
  const { onFocus } = useFocus();

  const [approveMortgageTokenStatus, approveMortgageToken] = useApprove(
    debt?.mortgageToken,
    debt?.mortgagePoolContract?.address,
    val
  );

  const [approveParassetTokenStatus, approveParassetToken] = useApprove(
    debt?.uToken,
    debt?.mortgagePoolContract?.address,
    select === "Repay"
      ? new BigNumber(debtInfo.fee).plus(val).toFixed(18, 1)
      : debtInfo.fee
  );

  const canBuyAmount = useMemo(() => {
    return debt?.depositTokenName === "ETH" && select === "Stake"
      ? $isPositiveNumber(
          $isFiniteNumber(getNumberToFixed(new BigNumber(max).minus(0.025)))
        )
      : max;
  }, [max, select, debt?.depositTokenName]);

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
            .times(100)
            .toNumber()
        )
      );
    } else if (select === "Redeem") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(
              new BigNumber(debtInfo.mortgageAssets)
                .minus(val)
                .times(debtInfo.mortgageToParassetPrice)
            )
            .times(100)

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
            .times(100)
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
            .times(100)
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
            .div(
              new BigNumber(debtInfo.mortgageAssets)
                .plus(val)
                .times(debtInfo.liqRatio)
            )

            .toNumber()
        )
      );
    } else if (select === "Redeem") {
      return $isPositiveNumber(
        $isFiniteNumber(
          new BigNumber(debtInfo.parassetAssets)
            .div(
              new BigNumber(debtInfo.mortgageAssets)
                .minus(val)
                .times(debtInfo?.liqRatio)
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
        value: <Value value={liqChanges} showAll={true} />,

        unit: debt.liqUnit,
      },
      payFee: {
        label: "jnwdf",
        value: <Value value={debtInfo.fee} showAll={true} />,
        unit: debt.earnTokenName,
      },
      oracleFee: {
        label: "yyjdyf",
        value:  process.env.REACT_APP_NODE_ENV === "development" ? "0.001" : "0",
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
        value: <Value value={liqChanges} showAll={true} />,
        unit: debt.liqUnit,
      },
      payFee: {
        label: "jnwdf",
        value: <Value value={debtInfo.fee} showAll={true} />,
        unit: debt.earnTokenName,
      },
      oracleFee: {
        label: "yyjdyf",
        value:  process.env.REACT_APP_NODE_ENV === "development" ? "0.001" : "0",
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
        balanceTxt: "ksh",
        exceededTip: "cgzdktqsl",
        columns,
      },
      Repay: {
        title: "chzw",
        label: "chsl",
        icon: debt.icon2,
        depositTokenName: debt.earnTokenName,
        placeholder: "qsrchsl",
        balanceTxt: "xch",
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
    } else if (parseFloat(ETHWalletBalance) < 0.001) {
      Toast.info(t("qbkyethbz"), 1000);
    } else if (getDep(val) > 18) {
      Toast.info(
        t("zdsrws", {
          decimal: 18,
        }),
        1000
      );
    } else if (
      select !== "Repay" &&
      new BigNumber(parassetBalance).lt(new BigNumber(debtInfo.fee))
    ) {
      Toast.info(t("qbkypxzcbz"), 1000);
    } else if (
      select === "Repay" &&
      new BigNumber(parassetBalance).lt(new BigNumber(debtInfo.fee).plus(val))
    ) {
      Toast.info(t("yebzchzwwdf"), 1000);
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
        fetchInfo();
        setTimeout(() => {
          setVal("");
          onDismiss();
        }, 1000);
      }
    }
  }, [ETHWalletBalance, onHandlerDebt, select, val, canBuyAmount, dataInfo]);

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
        showApprove={
          debt?.depositTokenName !== "ETH" ||
          (debt?.depositTokenName === "ETH" && approveParassetTokenStatus)
            ? true
            : false
        }
        approveStatus={
          select === "Stake" && debt?.depositTokenName !== "ETH"
            ? approveMortgageTokenStatus || approveParassetTokenStatus
            : approveParassetTokenStatus
        }
        approve={async () => {
          const func =
            select === "Stake" &&
            approveMortgageTokenStatus &&
            debt?.depositTokenName !== "ETH"
              ? approveMortgageToken
              : approveParassetToken;
          setPendingTx(true);
          await func();
          setPendingTx(false);
        }}
        approveTokenName={
          select === "Stake" &&
          approveMortgageTokenStatus &&
          debt?.depositTokenName !== "ETH"
            ? debt?.depositTokenName
            : debt?.earnTokenName
        }
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

export default Mine;
