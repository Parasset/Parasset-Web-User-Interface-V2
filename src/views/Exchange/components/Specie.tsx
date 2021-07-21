//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Toast from "light-toast";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useBasisCash from "../../../hooks/useBasisCash";
import useAvgPrice from "../../../hooks/useAvgPrice";
import useBlur from "../../../hooks/useBlur";
import {
  getDep,
  $isFiniteNumber,
  $isPositiveNumber,
} from "../../../utils/utils";
import useItank from "../../../hooks/itank/useItank";
import useItankInfo from "../../../hooks/itank/useItankInfo";
import useExchange from "../../../hooks/itank/useExchange";
import useApprove from "../../../hooks/useApprove";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const avgPrice = useAvgPrice();
  const { onExchange } = useExchange();
  const [pendingTx, setPendingTx] = useState(false);
  const [isTransform, setIsTransform] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);

  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false);

  const [selectInputCurrency, setSelectInputCurrency] = useState("ETH");

  const [showOutputCurrencySelect, setShowOutputCurrencySelect] = useState(
    false
  );
  const [selectOutputCurrency, setSelectOutputCurrency] = useState("PETH");

  const { onBlur } = useBlur();
  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const USDTWalletBalance = useTokenBalance(basisCash?.externalTokens["USDT"]);
  const PETHWalletBalance = useTokenBalance(basisCash?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(basisCash?.externalTokens["PUSD"]);
  const PUSDItankBalance = useTokenBalance(basisCash?.contracts["PUSDInsPool"]);
  const PETHItankBalance = useTokenBalance(basisCash?.contracts["PETHInsPool"]);
  const itankPUSD = useItank("PUSDInsPool");
  const itankPETH = useItank("PETHInsPool");
  const { fee: itankPUSDFee } = useItankInfo(itankPUSD);
  const { fee: itankPETHFee } = useItankInfo(itankPETH);

  const [approveStatusPETH, approvePETH] = useApprove(
    basisCash?.externalTokens["PETH"],
    basisCash?.contracts["PETHInsPool"]?.address
  );

  const [approveStatusUSDT, approveUSDT] = useApprove(
    basisCash?.externalTokens["USDT"],
    basisCash?.contracts["PUSDInsPool"]?.address
  );

  const [approveStatusPUSD, approvePUSD] = useApprove(
    basisCash?.externalTokens["PUSD"],
    basisCash?.contracts["PUSDInsPool"]?.address
  );

  const approveList = useMemo(() => {
    return {
      PETH: {
        status: approveStatusPETH,
        approve: approvePETH,
      },
      USDT: {
        status: approveStatusUSDT,
        approve: approveUSDT,
      },
      PUSD: {
        status: approveStatusPUSD,
        approve: approvePUSD,
      },
    };
  }, [
    approveStatusPETH,
    approveStatusUSDT,
    approveStatusPUSD,
    approvePETH,
    approveUSDT,
    approvePUSD,
  ]);
  const inputCurrencyList = useMemo(() => {
    return [
      {
        name: "ETH",
        id: "ETH",
        walletBalance: ETHWalletBalance,
        itankBalance: PETHItankBalance,
      },
      {
        name: "USDT",
        id: "USDT",
        walletBalance: USDTWalletBalance,
        itankBalance: PUSDItankBalance,
      },
    ];
  }, [
    ETHWalletBalance,
    USDTWalletBalance,
    PETHWalletBalance,
    PUSDWalletBalance,
    PUSDItankBalance,
    PETHItankBalance,
  ]);

  const outputCurrencyList = useMemo(() => {
    return [
      {
        name: "PETH",
        id: "PETH",
        walletBalance: PETHWalletBalance,
        itankBalance: PETHItankBalance,
      },
      {
        name: "PUSD",
        id: "PUSD",
        walletBalance: PUSDWalletBalance,
        itankBalance: PUSDItankBalance,
      },
    ];
  }, [
    ETHWalletBalance,
    USDTWalletBalance,
    PETHWalletBalance,
    PUSDWalletBalance,
    PUSDItankBalance,
    PETHItankBalance,
  ]);

  const currencyListInput = useMemo(() => {
    return !isTransform ? inputCurrencyList : outputCurrencyList;
  }, [inputCurrencyList, outputCurrencyList, isTransform]);

  const currencyListOutput = useMemo(() => {
    return !isTransform ? outputCurrencyList : inputCurrencyList;
  }, [inputCurrencyList, outputCurrencyList, isTransform]);

  const inputCurrencyBalance = useMemo(() => {
    let item = currencyListInput.filter((item) => {
      return item.id === selectInputCurrency;
    });
    return item[0].walletBalance;
  }, [currencyListInput, selectInputCurrency]);

  const outputCurrencyBalance = useMemo(() => {
    let item = currencyListOutput.filter((item) => {
      return item.id === selectOutputCurrency;
    });
    return item[0].itankBalance;
  }, [currencyListOutput, selectOutputCurrency]);

  const isETH = useMemo(() => {
    return selectInputCurrency === "ETH" || setSelectOutputCurrency === "ETH";
  }, [selectInputCurrency, setSelectOutputCurrency]);

  const fee = useMemo(() => {
    const feeRatio = !isETH ? itankPUSDFee : itankPETHFee;
    const fee = new BigNumber(inputValue).times(feeRatio).toNumber();
    return $isPositiveNumber($isFiniteNumber(fee));
  }, [isETH, itankPUSDFee, itankPETHFee, inputValue]);

  const inputCurrencyValue = useMemo(() => {
    let amount = !isETH
      ? inputValue
      : new BigNumber(inputValue).times(avgPrice).toNumber();

    return $isFiniteNumber(amount);
  }, [inputValue, avgPrice, !isETH]);

  const outputCurrencyValue = useMemo(() => {
    let amount = !isETH
      ? outputValue
      : new BigNumber(outputValue).times(avgPrice).toNumber();
    return $isFiniteNumber(amount);
  }, [outputValue, avgPrice, isETH]);

  const inputMax = useMemo(() => {
    var max = new BigNumber(inputCurrencyBalance).minus(0.01).toNumber();
    var canBuyAmount = isETH ? max : inputCurrencyBalance;
    return parseFloat(canBuyAmount);
  }, [inputCurrencyBalance, isETH, outputCurrencyBalance, isTransform]);

  const outputMax = useMemo(() => {
    var max = Number.MAX_SAFE_INTEGER;
    var canBuyAmount = isTransform ? max : outputCurrencyBalance;
    return parseFloat(canBuyAmount);
  }, [inputCurrencyBalance, isETH, outputCurrencyBalance, isTransform]);

  const calcAmount = useCallback(
    ({ value, isInput }) => {
      if (isInput) {
        const val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        setInputValue(val);
        const feeRatio = !isETH ? itankPUSDFee : itankPETHFee;
        const amount = new BigNumber(val)
          .minus(new BigNumber(val).times(feeRatio))
          .toNumber();
        const outputAmount = $isPositiveNumber($isFiniteNumber(amount));

        setOutputValue(outputAmount);
      } else {
        const val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        setOutputValue(val);
        const feeRatio = !isETH ? itankPUSDFee : itankPETHFee;
        const amount = new BigNumber(val)
          .div(new BigNumber(1).minus(feeRatio))
          .toNumber();
        const inputAmount = $isPositiveNumber($isFiniteNumber(amount));
        setInputValue(inputAmount);
      }
    },
    [
      inputCurrencyBalance,
      isETH,
      outputCurrencyBalance,
      isTransform,
      itankPUSDFee,
      itankPETHFee,
    ]
  );

  const handleChangeInputValue = useCallback(
    (e) => {
      const { value } = e.currentTarget;
      calcAmount({
        value,
        isInput: true,
      });
    },
    [
      inputCurrencyBalance,
      isETH,
      outputCurrencyBalance,
      isTransform,
      itankPUSDFee,
      itankPETHFee,
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
      inputCurrencyBalance,
      isETH,
      outputCurrencyBalance,
      isTransform,
      itankPUSDFee,
      itankPETHFee,
    ]
  );

  const onChangeInputCurrencySelect = useCallback(
    ({ id }, index) => {
      setSelectInputCurrency(id);
      setSelectOutputCurrency(currencyListOutput[index].id);
    },
    [currencyListOutput]
  );

  const onChangeOutputCurrencySelect = useCallback(
    ({ id }, index) => {
      setSelectOutputCurrency(id);
      setSelectInputCurrency(currencyListInput[index].id);
    },
    [currencyListInput]
  );

  const onTransformCurrency = useCallback(() => {
    setIsTransform(!isTransform);
    setSelectInputCurrency(selectOutputCurrency);
    setSelectOutputCurrency(selectInputCurrency);
    calcAmount({
      value: outputValue,
      isInput: true,
    });
    calcAmount({
      value: inputValue,
      isInput: false,
    });
  }, [
    isTransform,
    inputValue,
    outputValue,
    selectInputCurrency,
    selectOutputCurrency,
    inputCurrencyBalance,
    outputCurrencyBalance,
    isETH,
    itankPUSDFee,
    itankPETHFee,
  ]);

  const onConfirm = useCallback(async () => {
    if (!parseFloat(inputValue)) {
      Toast.info(t("qsrbdzcdhsl"), 1000);
    } else if (parseFloat(inputValue) > parseFloat(inputMax)) {
      Toast.info(t("qbbdzcyebz"), 1000);
    } else if (getDep(inputValue) > 14) {
      Toast.info(t("zdsrws"), 1000);
    } else {
      setPendingTx(true);
      const itankContract = isETH
        ? basisCash?.contracts["PETHInsPool"]
        : basisCash?.contracts["PUSDInsPool"];
      const token = basisCash?.externalTokens[selectInputCurrency];
      console.log(
        "🚀 ~ file: Specie.tsx ~ line 328 ~ onConfirm ~ token",
        token.decimal
      );
      const result = await onExchange(
        itankContract,
        inputValue,
        token.decimal,
        isTransform
      );
      setPendingTx(false);
      if (result !== "0") {
        setInputValue("");
        setOutputValue("");
      }
    }
  }, [
    inputMax,
    outputMax,
    inputValue,
    outputValue,
    basisCash?.externalTokens,
    basisCash?.contracts,
    isTransform,
    isETH,
    selectInputCurrency,
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
          <div>{t("cong")}</div>
          <div>
            {t("yue")}
            <span
              className="color-dark text-underline cursor-pointer"
              onClick={() => {
                calcAmount({
                  value: inputMax,
                  isInput: true,
                });
              }}
            >
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
        <StyledExchangeImg className="text-center">
          <img
            src={require("../../../assets/img/change_icon.png")}
            width="50"
            height="50"
            className="center-block cursor-pointer"
            onClick={onTransformCurrency}
          />
        </StyledExchangeImg>
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>{t("dao")}</div>
          <div>
            {t("bxjjye")}
            <span
              className="color-dark text-underline cursor-pointer"
              onClick={() => {
                calcAmount({
                  value: outputMax,
                  isInput: false,
                });
              }}
            >
              <Value value={outputCurrencyBalance} decimals={6} />
            </span>
          </div>
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
          isInputCurrencySelect={false}
          value={outputValue}
          handleChange={handleChangeOutputValue}
          onBlur={(e) => {
            onBlur(e, setOutputValue);
          }}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={outputCurrencyValue} prefix="$" />
        </div>
        <Spacer size="sm" />
        <Label
          label={t("dhbl")}
          value={!isETH ? "1 USDT=1 PUSD" : "1 ETH=1 PETH"}
          className="wing-blank-lg"
        />
        <Spacer size="mmd" />
        <Label
          label={t("sxf")}
          value={
            <Value value={fee} suffix={selectOutputCurrency} decimals={6} />
          }
          className="wing-blank-lg"
        />
        <Spacer />
        {selectInputCurrency === "ETH" ? (
          <Button
            text={t("duihuan")}
            variant="secondary"
            disabled={pendingTx}
            onClick={onConfirm}
          />
        ) : approveList[selectInputCurrency].status ? (
          <Button
            text={`${t("sq")} ${selectInputCurrency}`}
            variant="secondary"
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true);
              await approveList[selectInputCurrency].approve();
              setPendingTx(false);
            }}
          />
        ) : (
          <Button
            text={t("duihuan")}
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
const StyledExchangeImg = styled.div`
  margin-top: -10px;
  margin-bottom: -10px;
`;
export default Specie;
