//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
import { $isFiniteNumber, $isPositiveNumber } from "../../../utils/utils";
import useItank from "../../../hooks/itank/useItank";
import useItankInfo from "../../../hooks/itank/useItankInfo";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const avgPrice = useAvgPrice();

  const [isTransform, setIsTransform] = useState(true);
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);

  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false);

  const [selectInputCurrency, setSelectInputCurrency] = useState("ETH");

  const [showOutputCurrencySelect, setShowOutputCurrencySelect] = useState(
    false
  );
  const [selectOutputCurrency, setSelectOutputCurrency] = useState("PETH");

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
    return isTransform ? inputCurrencyList : outputCurrencyList;
  }, [inputCurrencyList, outputCurrencyList, isTransform]);

  const currencyListOutput = useMemo(() => {
    return isTransform ? outputCurrencyList : inputCurrencyList;
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
    const fee = new BigNumber(inputValue)
    .minus(new BigNumber(inputValue).times(feeRatio))
    .toNumber();
    console.log("🚀 ~ file: Specie.tsx ~ line 125 ~ fee ~ fee",feeRatio, $isPositiveNumber($isFiniteNumber(fee)))
    return $isPositiveNumber($isFiniteNumber(fee));
  }, [!isETH, itankPUSDFee, itankPETHFee, inputValue]);

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
  }, [outputValue, avgPrice, !isETH]);

  const limitValue = useCallback((value, canBuyAmount) => {
    const minLimit = 0;
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
    return value;
  }, []);

  const handleChangeInputValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const value = limitValue(e.currentTarget.value, inputCurrencyBalance);
      setInputValue(value);
    },
    [setInputValue, inputCurrencyBalance]
  );

  const handleChangeOutputValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const value = limitValue(e.currentTarget.value, outputCurrencyBalance);
      setOutputValue(value);
    },
    [setOutputValue, outputCurrencyBalance]
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
    setInputValue(outputValue);
    setOutputValue(inputValue);
  }, [
    isTransform,
    inputValue,
    outputValue,
    selectInputCurrency,
    selectOutputCurrency,
    inputCurrencyBalance,
    outputCurrencyBalance,
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
            <span className="color-dark text-underline">
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
            <span className="color-dark text-underline">
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
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={outputCurrencyValue} prefix="$" />
        </div>
        <Spacer size="sm" />
        <Label
          label={t("dhbl")}
          value={!isETH?'1 ETH =1 ETH':'ETH'}
          className="wing-blank-lg"
        />
        <Spacer size="mmd" />
        <Label label={t("sxf")} value={ <Value value={fee} suffix={!isETH?'USDT':'ETH'}  />}  className="wing-blank-lg" />
        <Spacer />
        <Button text={t("duihuan")} variant="secondary" />
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
