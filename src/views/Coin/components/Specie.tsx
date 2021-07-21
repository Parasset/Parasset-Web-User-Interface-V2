//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";

import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import useBlur from "../../../hooks/useBlur";
import useApprove from "../../../hooks/useApprove";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useBasisCash from "../../../hooks/useBasisCash";
import useAvgPrice from "../../../hooks/useAvgPrice";

import {
  getDep,
  $isFiniteNumber,
  $isPositiveNumber,
  getEncryptAddress,
} from "../../../utils/utils";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const avgPrice = useAvgPrice();
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [pendingTx, setPendingTx] = useState(false);
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false);

  const [selectInputCurrency, setSelectInputCurrency] = useState("ETH");

  const [showOutputCurrencySelect, setShowOutputCurrencySelect] = useState(
    false
  );
  const [selectOutputCurrency, setSelectOutputCurrency] = useState("PUSD");

  const { onBlur } = useBlur();

  const isETH = useMemo(() => {
    return selectInputCurrency === "ETH" || setSelectOutputCurrency === "ETH";
  }, [selectInputCurrency, setSelectOutputCurrency]);

  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const NESTWalletBalance = useTokenBalance(basisCash?.externalTokens["NEST"]);
  const PETHWalletBalance = useTokenBalance(basisCash?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(basisCash?.externalTokens["PUSD"]);
  const [approveStatusNEST, approveNEST] = useApprove(
    basisCash?.externalTokens["NEST"],
    basisCash?.contracts["PETHInsPool"]?.address
  );
//换地址

  const currencyListInput = useMemo(() => {
    return [
      {
        name: "ETH",
        id: "ETH",
        walletBalance: ETHWalletBalance,
        itankBalance: 0,
      },
      {
        name: "NEST",
        id: "NEST",
        walletBalance: NESTWalletBalance,
        itankBalance: 0,
      },
    ];
  }, [ETHWalletBalance, NESTWalletBalance]);

  const currencyListOutput = useMemo(() => {
    return isETH
      ? [
          {
            name: "PUSD",
            id: "PUSD",
            walletBalance: PUSDWalletBalance,
            itankBalance: 0,
          },
        ]
      : [
          {
            name: "PUSD",
            id: "PUSD",
            walletBalance: PUSDWalletBalance,
            itankBalance: 0,
          },
          {
            name: "PETH",
            id: "PETH",
            walletBalance: PETHWalletBalance,
            itankBalance: 0,
          },
        ];
  }, [selectInputCurrency, PETHWalletBalance, PUSDWalletBalance]);

  const inputCurrencyBalance = useMemo(() => {
    let item = currencyListInput.filter((item) => {
      return item.id === selectInputCurrency;
    });
    return item[0].walletBalance;
  }, [currencyListInput, selectInputCurrency]);

  const inputCurrencyValue = useMemo(() => {
    let amount = !isETH
      ? inputValue
      : new BigNumber(inputValue).times(avgPrice).toNumber();

    return $isFiniteNumber(amount);
  }, [inputValue, avgPrice, !isETH]);
  const cointAddress = useMemo(() => {
    return getEncryptAddress(
      basisCash?.externalTokens[selectOutputCurrency].address
    );
  }, [selectOutputCurrency, basisCash?.externalTokens]);

  const onChangeInputCurrencySelect = useCallback(
    ({ id }, index) => {
      setSelectInputCurrency(id);
      //默认输出PUSD
      setSelectOutputCurrency(currencyListOutput[0].id);
    },
    [isETH, currencyListOutput]
  );

  const onChangeOutputCurrencySelect = useCallback(
    ({ id }) => {
      setSelectOutputCurrency(id);
    },
    [currencyListInput]
  );
  const calcAmount = useCallback(
    ({ value, isInput }) => {
      // if (isInput) {
      //   const val =
      //     value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
      //   setInputValue(val);
      //   const feeRatio = !isETH ? itankPUSDFee : itankPETHFee;
      //   const amount = new BigNumber(val)
      //     .minus(new BigNumber(val).times(feeRatio))
      //     .toNumber();
      //   const outputAmount = $isPositiveNumber($isFiniteNumber(amount));
      //   setOutputValue(outputAmount);
      // } else {
      //   const val =
      //     value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
      //   setOutputValue(val);
      //   const feeRatio = !isETH ? itankPUSDFee : itankPETHFee;
      //   const amount = new BigNumber(val)
      //     .div(new BigNumber(1).minus(feeRatio))
      //     .toNumber();
      //   const inputAmount = $isPositiveNumber($isFiniteNumber(amount));
      //   setInputValue(inputAmount);
      // }
    },
    [
      // inputCurrencyBalance,
      // isETH,
      // outputCurrencyBalance,
      // isTransform,
      // itankPUSDFee,
      // itankPETHFee,
    ]
  );
  const handleChangeInputValue = useCallback(
    (e) => {
      const { value } = e.currentTarget;
      // calcAmount({
      //   value,
      //   isInput: true,
      // });
      setInputValue(value);
    },
    [
      // inputCurrencyBalance,
      // isETH,
      // outputCurrencyBalance,
      // isTransform,
      // itankPUSDFee,
      // itankPETHFee,
    ]
  );

  const handleChangeOutputValue = useCallback(
    (e) => {
      const { value } = e.currentTarget;

      calcAmount({
        value,
        isInput: false,
      });
    },
    [
      // inputCurrencyBalance,
      // isETH,
      // outputCurrencyBalance,
      // isTransform,
      // itankPUSDFee,
      // itankPETHFee,
    ]
  );

  const onConfirm = useCallback(async () => {
    // if (!parseFloat(inputValue)) {
    //   Toast.info(t("qsrbdzcdhsl"), 1000);
    // } else if (parseFloat(inputValue) > parseFloat(inputMax)) {
    //   Toast.info(t("qbbdzcyebz"), 1000);
    // } else if (getDep(inputValue) > 14) {
    //   Toast.info(t("zdsrws"), 1000);
    // } else {
    //   setPendingTx(true);
   
    //   const result = await onExchange(
    //     itankContract,
    //     inputValue,
    //     token.decimal,
    //     isTransform
    //   );
    //   setPendingTx(false);
    //   if (result !== "0") {
    //     setInputValue("");
    //     setOutputValue("");
    //   }
    // }
  }, [
   
  ]);
  const handleDocumentClick = useCallback(() => {
    setShowInputCurrencySelect(false);
    setShowOutputCurrencySelect(false);
  }, []);

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <Card className="wing-blank-lg">
        <Spacer />
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div> {t("dyzcsl")}</div>
          <div>
            {t("yue")}
            <span
              className="color-dark text-underline"
              onClick={() => {
                calcAmount({
                  value: inputMax,
                  isInput: true,
                });
              }}
            >
              {" "}
              <Value value={inputCurrencyBalance} decimals={6} />
            </span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select
          showSelect={showInputCurrencySelect}
          list={currencyListInput}
          active={selectInputCurrency}
          toggleShow={() => {
            setShowInputCurrencySelect(!showInputCurrencySelect);
          }}
          onChangeSelect={onChangeInputCurrencySelect}
          isInputCurrencySelect={true}
          value={inputValue}
          handleChange={handleChangeInputValue}
          onBlur={(e) => {
            onBlur(e, setInputValue);
          }}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={inputCurrencyValue} prefix="$" />
        </div>
        <Spacer size="sm" />
        <Select
          showSelect={showOutputCurrencySelect}
          list={currencyListOutput}
          active={selectOutputCurrency}
          toggleShow={() => {
            setShowOutputCurrencySelect(!showOutputCurrencySelect);
          }}
          onChangeSelect={onChangeOutputCurrencySelect}
          isInputCurrencySelect={true}
          value={outputValue}
          handleChange={handleChangeOutputValue}
          onBlur={(e) => {
            onBlur(e, setOutputValue);
          }}
        />
        <Spacer size="mmd" />
        <Label label={t("dyl")} value="70%" className="wing-blank-lg" />
        <Spacer size="mmd" />
        <Label
          label={t("heyue", {
            label: selectOutputCurrency,
          })}
          value={cointAddress}
          className="wing-blank-lg"
        />

        <Spacer size="mmd" />
        {/* <Label
          label={
            <Tooltip title={t("tip2")}>
              <div className="text-underline">{t("yyjdyf")}</div>
            </Tooltip>
          }
          value="0.01 ETH"
          className="wing-blank-lg"
        /> */}

        

        <Spacer size="mmd" />
        <Label label={t("wdf")} value="0.01 PUSD" className="wing-blank-lg" />
        <Spacer />

        {selectInputCurrency === "ETH" ? (
          <Button
            text={t("zhubi")}
            variant="secondary"
            disabled={pendingTx}
            onClick={onConfirm}
          />
        ) : approveStatusNEST ? (
          <Button
            text={`${t("sq")} ${selectInputCurrency}`}
            variant="secondary"
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true);
              await approveNEST();
              setPendingTx(false);
            }}
          />
        ) : (
          <Button
            text={t("zhubi")}
            variant="secondary"
            disabled={pendingTx}
            onClick={onConfirm}
          />
        )}
        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};

export default Specie;
