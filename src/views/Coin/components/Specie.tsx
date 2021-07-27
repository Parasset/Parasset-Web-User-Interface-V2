//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import Toast from "light-toast";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Copy from "../../../components/Copy";

import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import useBlur from "../../../hooks/useBlur";
import useApprove from "../../../hooks/useApprove";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useBasisCash from "../../../hooks/useBasisCash";
import useAvgPrice from "../../../hooks/useAvgPrice";
import usePrice from "../../../hooks/coin/usePrice";
import useMaxRatio from "../../../hooks/coin/useMaxRatio";
import useFee from "../../../hooks/coin/useFee";
import useCoin from "../../../hooks/coin/useCoin";

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
  const { onCoin } = useCoin();
  const {
    selectInputCurrency: inputCurrency,
    selectOutputCurrency: outputCurrency,
  } = useParams();
  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();

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
  const maxRatioETHPUSD = useMaxRatio(
    basisCash?.contracts["PUSDMorPool"],
    basisCash?.externalTokens["ETH"]
  );
  const maxRatioNESTPUSD = useMaxRatio(
    basisCash?.contracts["PUSDMorPool"],
    basisCash?.externalTokens["NEST"]
  );
  const maxRatioNESTPETH = useMaxRatio(
    basisCash?.contracts["PETHMorPool"],
    basisCash?.externalTokens["NEST"]
  );

  const feeETHPUSD = useFee(
    basisCash?.contracts["PUSDMorPool"],
    basisCash?.externalTokens["ETH"],
    basisCash?.externalTokens["USDT"]
  );

  const feeNESTPUSD = useFee(
    basisCash?.contracts["PUSDMorPool"],
    basisCash?.externalTokens["NEST"],
    basisCash?.externalTokens["USDT"]
  );
  const feeNESTPETH = useFee(
    basisCash?.contracts["PETHMorPool"],
    basisCash?.externalTokens["NEST"],
    basisCash?.externalTokens["PETH "]
  );

  const isETH = useMemo(() => {
    return selectInputCurrency === "ETH" || setSelectOutputCurrency === "ETH";
  }, [selectInputCurrency, setSelectOutputCurrency]);

  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const NESTWalletBalance = useTokenBalance(basisCash?.externalTokens["NEST"]);
  const PETHWalletBalance = useTokenBalance(basisCash?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(basisCash?.externalTokens["PUSD"]);
  const [approveStatusPUSD, approvePUSD] = useApprove(
    basisCash?.externalTokens["PUSD"],
    basisCash?.contracts["PUSDMorPool"]?.address
  );

  const [approveStatusPETH, approvePETH] = useApprove(
    basisCash?.externalTokens["PETH"],
    basisCash?.contracts["PETHMorPool"]?.address
  );
  console.log(
    approveStatusPUSD,
    approveStatusPETH,
    basisCash?.externalTokens["PUSD"]?.address,
    basisCash?.contracts["PUSDMorPool"]?.address,
    basisCash?.externalTokens["PETH"]?.address,
    basisCash?.contracts["PETHMorPool"]?.address
  );

  const approveList = useMemo(() => {
    return {
      PETH: {
        status: approveStatusPETH,
        approve: approvePETH,
      },

      PUSD: {
        status: approveStatusPUSD,
        approve: approvePUSD,
      },
    };
  }, [approveStatusPETH, approveStatusPUSD, approvePETH, approvePUSD]);

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

  const maxList = useMemo(() => {
    return {
      ETH: new BigNumber(ETHWalletBalance).minus(0.02).toNumber(),
      NEST: NESTWalletBalance,
    };
  }, [ETHWalletBalance, NESTWalletBalance]);

  const inputCurrencyBalance = useMemo(() => {
    let item = currencyListInput.filter((item) => {
      return item.id === selectInputCurrency;
    });
    return item[0].walletBalance;
  }, [currencyListInput, selectInputCurrency]);

  const inputCurrencyValue = useMemo(() => {
    let amount = isETH
      ? new BigNumber(inputValue).times(ETHAvgPrice).toNumber()
      : new BigNumber(inputValue).times(NESTToUSDTPrice).toNumber();

    return $isFiniteNumber(amount);
  }, [inputValue, NESTToUSDTPrice, ETHAvgPrice, isETH]);

  const inputMax = useMemo(() => {
    var max = new BigNumber(inputCurrencyBalance).minus(0.02).toNumber();
    var canBuyAmount = isETH ? max : inputCurrencyBalance;
    return parseFloat(canBuyAmount);
  }, [inputCurrencyBalance, isETH]);

  const cointAddress = useMemo(() => {
    return {
      encryptAddress: getEncryptAddress(
        basisCash?.externalTokens[selectOutputCurrency].address
      ),
      address: basisCash?.externalTokens[selectOutputCurrency].address,
    };
  }, [selectOutputCurrency, basisCash?.externalTokens]);
  const dataList = useMemo(() => {
    return {
      ETHPUSD: {
        maxRatio: maxRatioETHPUSD,
        price: ETHAvgPrice,
        fee: feeETHPUSD,
        mortgagePoolContract: basisCash?.contracts["PUSDMorPool"],
        mortgageToken: basisCash?.externalTokens["ETH"],
      },
      NESTPUSD: {
        maxRatio: maxRatioNESTPUSD,
        price: NESTToUSDTPrice,
        fee: feeNESTPUSD,
        mortgagePoolContract: basisCash?.contracts["PUSDMorPool"],
        mortgageToken: basisCash?.externalTokens["NEST"],
      },
      NESTPETH: {
        maxRatio: maxRatioNESTPETH,
        price: NESTToETHPrice,
        fee: feeNESTPETH,
        mortgagePoolContract: basisCash?.contracts["PETHMorPool"],
        mortgageToken: basisCash?.externalTokens["NEST"],
      },
    };
  }, [
    NESTToUSDTPrice,
    NESTToETHPrice,
    ETHAvgPrice,
    feeETHPUSD,
    feeNESTPUSD,
    feeNESTPETH,
    maxRatioETHPUSD,
    maxRatioNESTPUSD,
    maxRatioNESTPETH,
    selectInputCurrency,
    selectOutputCurrency,
  ]);

  const calcRatio = useMemo(() => {
    if (parseFloat(inputValue) && parseFloat(outputValue)) {
      // NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice
      // X=输入的PUSD数量/(输入的ETH数量*ETH-USDT预言机价格) ETH铸币PUSD
      // X=输入的PUSD数量/(输入的NEST数量*NEST-USDT预言机价格) NEST铸币PUSD
      // X=输入的PETH数量/(输入的NEST数量*NEST-PETH预言机价格)  NEST铸币PETH
      // 若X大于NEST的最高抵押率（合约返回值），则红色显示前端计算的抵押率结果；铸币按钮灰色不可点击；若X小于等于NEST的最高抵押率，则可正常铸币
      const price = dataList[selectInputCurrency + selectOutputCurrency].price;
      const ratio = new BigNumber(outputValue)
        .div(new BigNumber(inputValue).times(price))
        .toNumber();
      return $isPositiveNumber($isFiniteNumber(ratio));
    }
  }, [inputValue, outputValue, dataList]);

  const isExceeds = useMemo(() => {
    const { maxRatio } = dataList[selectInputCurrency + selectOutputCurrency];
    return new BigNumber(calcRatio).gt(maxRatio);
  }, [calcRatio, dataList, selectInputCurrency, selectOutputCurrency]);

  const ratio = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(calcRatio).times(100).toNumber())
    );
  }, [calcRatio]);

  const fee = useMemo(() => {
    const fee = dataList[selectInputCurrency + selectOutputCurrency].fee;
    return fee;
  }, [dataList, selectInputCurrency, selectOutputCurrency]);

  const onChangeInputCurrencySelect = useCallback(
    ({ id }, index) => {
      setSelectInputCurrency(id);
      //默认输出PUSD
      setSelectOutputCurrency(currencyListOutput[0].id);
      const max = maxList[id];
      console.log(inputValue, max);
      setInputValue(parseFloat(inputValue) > max ? max : inputValue);
    },
    [isETH, currencyListOutput, inputMax, maxList, inputValue]
  );

  const onChangeOutputCurrencySelect = useCallback(
    ({ id }) => {
      setSelectOutputCurrency(id);
    },
    [currencyListInput]
  );

  const handleChangeInputValue = useCallback(
    (e) => {
      const minLimit = 0;
      var { value } = e.currentTarget;
      var value1 = parseFloat(value);
      const canBuyAmount = inputMax;
      var canBuyAmount1 = parseFloat(canBuyAmount);

      value =
        value1 > canBuyAmount1
          ? canBuyAmount
          : value !== "" && value1 <= minLimit
          ? minLimit
          : value !== "" && !Number.isFinite(value1)
          ? minLimit
          : value;
      setInputValue(value);
    },
    [inputMax]
  );

  const handleChangeOutputValue = useCallback((e) => {
    const { value } = e.currentTarget;
    setOutputValue(
      value === "" ? value : $isPositiveNumber($isFiniteNumber(value))
    );
  }, []);

  const onConfirm = useCallback(async () => {
    const { mortgagePoolContract, mortgageToken, fee, maxRatio } = dataList[
      selectInputCurrency + selectOutputCurrency
    ];

    if (!parseFloat(inputValue)) {
      Toast.info(t("qsrdyyszc"), 1000);
    } else if (parseFloat(inputValue) > parseFloat(inputMax)) {
      Toast.info(t("qbkydyzcyebz"), 1000);
    } else if (parseFloat(ETHWalletBalance) < 0.01) {
      Toast.info(t("qbkyethbz"), 1000);
    } else if (!parseFloat(outputValue)) {
      Toast.info(t("qsrzbsl"), 1000);
    } else if (getDep(inputValue) > 18 || getDep(outputValue) > 18) {
      Toast.info(t("zdsrws"), 1000);
    } else if (parseFloat(outputValue) < parseFloat(fee)) {
      Toast.info(t("qbyebzjnwdf"), 1000);
    } else if (calcRatio <= 0 || isExceeds) {
      Toast.info(
        t("cgzddyl", {
          label: maxRatio,
        }),
        1000
      );
    } else {
      setPendingTx(true);

      const result = await onCoin(
        mortgagePoolContract,
        mortgageToken,
        inputValue,
        calcRatio
      );
      setPendingTx(false);
      if (result !== "0") {
        setInputValue("");
        setOutputValue("");
      }
    }
  }, [
    inputValue,
    outputValue,
    inputMax,
    dataList,
    ETHWalletBalance,
    selectInputCurrency,
    selectOutputCurrency,
    calcRatio,
    isExceeds,
    onCoin,
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

  useEffect(() => {
    if (inputCurrency) {
      setSelectInputCurrency(inputCurrency);
    }
    if (outputCurrency) {
      setSelectOutputCurrency(outputCurrency);
    }
  }, [inputCurrency, outputCurrency]);
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
              className="color-dark text-underline cursor-pointer"
              onClick={() => {
                setInputValue(inputMax);
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
        <StyledExchangeImg className="text-center">
          <img
            src={require("../../../assets/img/icon_arrow_bottom.png")}
            width="50"
            height="50"
            className="center-block cursor-pointer"
          />
        </StyledExchangeImg>
        <Spacer />
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
        <Label
          label={t("dyl")}
          value={
            <div className={isExceeds ? "color-red" : ""}>
              <Value
                value={ratio}
                suffix="%"
                placeholder={true}
                showAll={true}
              />
            </div>
          }
          className="wing-blank-lg"
        />
        <Spacer size="mmd" />
        <Label
          label={t("heyue", {
            label: selectOutputCurrency,
          })}
          value={
            <div>
              {cointAddress?.encryptAddress}{" "}
              <Copy toCopy={cointAddress.address} />
            </div>
          }
          className="wing-blank-lg"
        />

        <Spacer size="mmd" />
        <Label
          label={
            <Tooltip title={t("tip2")}>
              <div className="text-underline">{t("yyjdyf")}</div>
            </Tooltip>
          }
          value="0.01 ETH"
          className="wing-blank-lg"
        />

        <Spacer size="mmd" />
        <Label
          label={t("wdf")}
          className="wing-blank-lg"
          value={
            <Value value={fee} suffix={selectOutputCurrency} showAll={true} />
          }
        />
        <Spacer />

        {!fee ? (
          <Button
            text={t("zhubi")}
            variant="secondary"
            disabled={pendingTx || calcRatio <= 0 || isExceeds}
            onClick={onConfirm}
          />
        ) : approveList[selectOutputCurrency].status ? (
          <Button
            text={`${t("sq")} ${selectOutputCurrency}`}
            variant="secondary"
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true);
              await approveList[selectOutputCurrency].approve();
              setPendingTx(false);
            }}
          />
        ) : (
          <Button
            text={t("zhubi")}
            variant="secondary"
            disabled={pendingTx || calcRatio <= 0 || isExceeds}
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
