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
import { $isFiniteNumber } from "../../../utils/utils";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const avgPrice = useAvgPrice();

  const [isTransform, setIsTransform] = useState(true);
  const [topValue, setTopValue] = useState(0);
  const [bottomValue, setBottomValue] = useState(0);

  const [showTopCurrencySelect, setShowTopCurrencySelect] = useState(false);

  const [selectTopCurrency, setSelectTopCurrency] = useState("ETH");

  const [showBottomCurrencySelect, setShowBottomCurrencySelect] = useState(
    false
  );
  const [selectBottomCurrency, setSelectBottomCurrency] = useState("PETH");

  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const USDTWalletBalance = useTokenBalance(basisCash?.externalTokens["USDT"]);
  const PETHWalletBalance = useTokenBalance(basisCash?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(basisCash?.externalTokens["PUSD"]);
  const PUSDItankBalance = useTokenBalance(basisCash?.contracts["PUSDInsPool"]);
  const PETHItankBalance = useTokenBalance(basisCash?.contracts["PETHInsPool"]);

  const topCurrencyList = useMemo(() => {
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

  const bottomCurrencyList = useMemo(() => {
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

  const currencyListTop = useMemo(() => {
    return isTransform ? topCurrencyList : bottomCurrencyList;
  }, [topCurrencyList, bottomCurrencyList, isTransform]);

  const currencyListBottom = useMemo(() => {
    return isTransform ? bottomCurrencyList : topCurrencyList;
  }, [topCurrencyList, bottomCurrencyList, isTransform]);

  const topCurrencyBalance = useMemo(() => {
    let item = currencyListTop.filter((item) => {
      return item.id === selectTopCurrency;
    });
    return item[0].walletBalance;
  }, [currencyListTop, selectTopCurrency]);

  const bottomCurrencyBalance = useMemo(() => {
    let item = currencyListBottom.filter((item) => {
      return item.id === selectBottomCurrency;
    });
    return item[0].itankBalance;
  }, [currencyListBottom, selectBottomCurrency]);

  const isUSDT = useMemo(() => {
    return selectTopCurrency === "USDT" || setSelectBottomCurrency === "USDT";
  }, [selectTopCurrency, setSelectBottomCurrency]);

  const topCurrencyValue = useMemo(() => {
    let amount = isUSDT
      ? topValue
      : new BigNumber(topValue).times(avgPrice).toNumber();
    return $isFiniteNumber(amount);
  }, [topValue, avgPrice, isUSDT]);

  const bottomCurrencyValue = useMemo(() => {
    let amount = isUSDT
      ? bottomValue
      : new BigNumber(bottomValue).times(avgPrice).toNumber();
    return $isFiniteNumber(amount);
  }, [bottomValue, avgPrice, isUSDT]);

  const handleChangeTopValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const minLimit = 0;
      var { value } = e.currentTarget;
      var value1 = parseFloat(value);
      const canBuyAmount = topCurrencyBalance;
      var canBuyAmount1 = parseFloat(canBuyAmount);
      value =
        value1 > canBuyAmount1
          ? canBuyAmount
          : value !== "" && value1 <= minLimit
          ? minLimit
          : value !== "" && !Number.isFinite(value1)
          ? minLimit
          : value;
      setTopValue(value);
    },
    [setTopValue, topCurrencyBalance]
  );

  const handleChangeBottomValue = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const minLimit = 0;
      var { value } = e.currentTarget;
      var value1 = parseFloat(value);
      const canBuyAmount = bottomCurrencyBalance;
      var canBuyAmount1 = parseFloat(canBuyAmount);
      value =
        value1 > canBuyAmount1
          ? canBuyAmount
          : value !== "" && value1 <= minLimit
          ? minLimit
          : value !== "" && !Number.isFinite(value1)
          ? minLimit
          : value;
      setBottomValue(value);
    },
    [setBottomValue, bottomCurrencyBalance]
  );

  const onTransformCurrency = useCallback(() => {
    setIsTransform(!isTransform);
    setSelectTopCurrency(selectBottomCurrency);
    setSelectBottomCurrency(selectTopCurrency);
    setTopValue(bottomValue);
    setBottomValue(topValue);
  }, [
    isTransform,
    topValue,
    bottomValue,
    selectTopCurrency,
    selectBottomCurrency,
  ]);

  const handleDocumentClick = useCallback(() => {
    setShowTopCurrencySelect(false);
    setShowBottomCurrencySelect(false);
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
              <Value value={topCurrencyBalance} decimals={6} />
            </span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select
          showSelect={showTopCurrencySelect}
          list={currencyListTop}
          active={selectTopCurrency}
          toggleShow={() => {
            setShowTopCurrencySelect(!showTopCurrencySelect);
          }}
          onChangeSelect={({ id }) => {
            setSelectTopCurrency(id);
          }}
          isTopCurrencySelect={true}
          value={topValue}
          handleChange={handleChangeTopValue}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={topCurrencyValue} prefix="$" />
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
              <Value value={bottomCurrencyBalance} decimals={6} />
            </span>
          </div>
        </div>
        <Spacer size="sm" />

        <Select
          showSelect={showBottomCurrencySelect}
          list={currencyListBottom}
          active={selectBottomCurrency}
          toggleShow={() => {
            setShowBottomCurrencySelect(!showBottomCurrencySelect);
          }}
          onChangeSelect={({ id }) => {
            setSelectBottomCurrency(id);
          }}
          isTopCurrencySelect={false}
          value={bottomValue}
          handleChange={handleChangeBottomValue}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={bottomCurrencyValue} prefix="$" />
        </div>
        <Spacer size="sm" />
        <Label
          label={t("dhbl")}
          value="1 ETH = 1200 PUSD"
          className="wing-blank-lg"
        />
        <Spacer size="mmd" />
        <Label label={t("sxf")} value="0.01 PETH" className="wing-blank-lg" />

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
