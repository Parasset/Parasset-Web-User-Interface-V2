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
import BtnLink from "../../../components/BtnLink";
import {
  getDep,
  $isFiniteNumber,
  $isPositiveNumber,
} from "../../../utils/utils";
import { updateNumDep } from "../../../utils/formatBalance";
import useItank from "../../../hooks/itank/useItank";
import useItankInfo from "../../../hooks/itank/useItankInfo";
import useExchange from "../../../hooks/itank/useExchange";
import useApprove from "../../../hooks/useApprove";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useParasset from "../../../hooks/useParasset";
import useAvgPrice from "../../../hooks/useAvgPrice";
import useBlur from "../../../hooks/useBlur";
import useFocus from "../../../hooks/useFocus";

const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const parasset = useParasset();
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
  const { onFocus } = useFocus();
  const ETHWalletBalance = useTokenBalance(parasset?.externalTokens["ETH"]);
  const USDTWalletBalance = useTokenBalance(parasset?.externalTokens["USDT"]);
  const HBTCWalletBalance = useTokenBalance(parasset?.externalTokens["HBTC"]);
  const PETHWalletBalance = useTokenBalance(parasset?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(parasset?.externalTokens["PUSD"]);
  const PBTCWalletBalance = useTokenBalance(parasset?.externalTokens["PBTC"]);

  const itankPUSD = useItank("PUSDInsPool");
  const itankPETH = useItank("PETHInsPool");
  const itankPBTC = useItank("PBTCInsPool");

  const {
    fee: itankPUSDFee,
    itankInfo: {
      earnFundBalance: PUSDItankBalance,
      depositFundBalance: USDTItankBalance,
    },
  } = useItankInfo(itankPUSD);
  const {
    fee: itankPETHFee,
    itankInfo: {
      earnFundBalance: PETHItankBalance,
      depositFundBalance: ETHItankBalance,
    },
  } = useItankInfo(itankPETH);
  const {
    fee: itankPBTCFee,
    itankInfo: {
      earnFundBalance: PBTCItankBalance,
      depositFundBalance: HBTCItankBalance,
    },
  } = useItankInfo(itankPBTC);

  const [approveStatusPETH, approvePETH] = useApprove(
    parasset?.externalTokens["PETH"],
    parasset?.contracts["PETHInsPool"]?.address,
    inputValue
  );

  const [approveStatusUSDT, approveUSDT] = useApprove(
    parasset?.externalTokens["USDT"],
    parasset?.contracts["PUSDInsPool"]?.address,
    inputValue
  );

  const [approveStatusPUSD, approvePUSD] = useApprove(
    parasset?.externalTokens["PUSD"],
    parasset?.contracts["PUSDInsPool"]?.address,
    inputValue
  );

  const [approveStatusHBTC, approveHBTC] = useApprove(
    parasset?.externalTokens["HBTC"],
    parasset?.contracts["PBTCInsPool"]?.address,
    inputValue
  );

  const [approveStatusPBTC, approvePBTC] = useApprove(
    parasset?.externalTokens["PBTC"],
    parasset?.contracts["PBTCInsPool"]?.address,
    inputValue
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
      HBTC: {
        status: approveStatusHBTC,
        approve: approveHBTC,
      },
      PBTC: {
        status: approveStatusPBTC,
        approve: approvePBTC,
      },
    };
  }, [
    approveStatusPETH,
    approveStatusUSDT,
    approveStatusPUSD,
    approveStatusPBTC,
    approveStatusHBTC,
    approvePETH,
    approveUSDT,
    approvePUSD,
    approveHBTC,
    approvePBTC,
  ]);

  const inputCurrencyList = useMemo(() => {
    return [
      {
        name: "ETH",
        id: "ETH",
        walletBalance: ETHWalletBalance,
        itankBalance: ETHItankBalance,
      },
      {
        name: "USDT",
        id: "USDT",
        walletBalance: USDTWalletBalance,
        itankBalance: USDTItankBalance,
      },
      {
        name: "HBTC",
        id: "HBTC",
        walletBalance: HBTCWalletBalance,
        itankBalance: HBTCItankBalance,
      },
    ];
  }, [
    ETHWalletBalance,
    USDTWalletBalance,
    PETHWalletBalance,
    PUSDWalletBalance,
    USDTItankBalance,
    ETHItankBalance,
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
      {
        name: "PBTC",
        id: "PBTC",
        walletBalance: PBTCWalletBalance,
        itankBalance: PBTCItankBalance,
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

  const selectCurrency = useMemo(() => {
    if (selectInputCurrency === "ETH" || selectOutputCurrency === "ETH") {
      return "ETH-PETH";
    } else if (
      selectInputCurrency === "USDT" ||
      selectOutputCurrency === "USDT"
    ) {
      return "USDT-PUSD";
    } else if (
      selectInputCurrency === "HBTC" ||
      selectOutputCurrency === "HBTC"
    ) {
      return "HBTC-PBTC";
    }
    return "ETH-PETH";
  }, [selectInputCurrency, selectOutputCurrency]);

  const fee = useMemo(() => {
    let feeRatio;
    switch (selectCurrency) {
      case "ETH-PETH":
        feeRatio = itankPETHFee;
        break;
      case "USDT-PUSD":
        feeRatio = itankPUSDFee;
        break;
      case "HBTC-PBTC":
        feeRatio = itankPBTCFee;
        break;
    }
    const fee = new BigNumber(inputValue).times(feeRatio).toNumber();
    return $isPositiveNumber($isFiniteNumber(fee));
  }, [selectCurrency, itankPUSDFee, itankPETHFee, inputValue]);

  const inputCurrencyValue = useMemo(() => {
    let amount =
      selectCurrency !== "ETH-PETH"
        ? inputValue
        : new BigNumber(inputValue).times(avgPrice).toNumber();

    return $isFiniteNumber(amount);
  }, [inputValue, avgPrice, selectCurrency]);

  const outputCurrencyValue = useMemo(() => {
    let amount =
      selectCurrency !== "ETH-PETH"
        ? outputValue
        : new BigNumber(outputValue).times(avgPrice).toNumber();
    return $isFiniteNumber(amount);
  }, [outputValue, avgPrice, selectCurrency]);

  const inputMax = useMemo(() => {
    let max = parseFloat(inputCurrencyBalance)
      ? new BigNumber(inputCurrencyBalance).minus(0.01).toFixed(18, 1)
      : 0;

    let canBuyAmount =
      selectInputCurrency === "ETH-PETH" ? max : inputCurrencyBalance;
    const amount = new BigNumber(canBuyAmount);
    return amount.toFixed(getDep(amount), 1);
  }, [
    inputCurrencyBalance,
    selectInputCurrency,
    outputCurrencyBalance,
    isTransform,
  ]);

  const calcAmount = useCallback(
    ({ value, isInput }) => {
      const inputToken = parasset?.externalTokens[selectInputCurrency];
      const outputToken = parasset?.externalTokens[selectOutputCurrency];

      if (isInput) {
        const val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        setInputValue(updateNumDep(val, inputToken));
        let feeRatio;
        switch (selectCurrency) {
          case "ETH-PETH":
            feeRatio = itankPETHFee;
            break;
          case "USDT-PUSD":
            feeRatio = itankPUSDFee;
            break;
          case "HBTC-PBTC":
            feeRatio = itankPBTCFee;
            break;
        }
        const amount = new BigNumber(val)
          .minus(new BigNumber(val).times(feeRatio))
          .toNumber();
        const outputAmount = $isPositiveNumber($isFiniteNumber(amount));

        setOutputValue(updateNumDep(outputAmount, outputToken));
      } else {
        const val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        setOutputValue(updateNumDep(val, outputToken));
        let feeRatio;
        switch (selectCurrency) {
          case "ETH-PETH":
            feeRatio = itankPETHFee;
            break;
          case "USDT-PUSD":
            feeRatio = itankPUSDFee;
            break;
          case "HBTC-PBTC":
            feeRatio = itankPBTCFee;
            break;
        }
        const amount = new BigNumber(val)
          .div(new BigNumber(1).minus(feeRatio))
          .toNumber();
        const inputAmount = $isPositiveNumber($isFiniteNumber(amount));

        setInputValue(updateNumDep(inputAmount, inputToken));
      }
    },
    [
      inputCurrencyBalance,
      selectCurrency,
      outputCurrencyBalance,
      isTransform,
      itankPUSDFee,
      itankPETHFee,
      parasset?.externalTokens,
      selectInputCurrency,
      selectOutputCurrency,
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
      selectCurrency,
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
      selectCurrency,
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
    selectCurrency,
    itankPUSDFee,
    itankPETHFee,
  ]);

  const onConfirm = useCallback(async () => {
    const token = parasset?.externalTokens[selectInputCurrency];
    if (!parseFloat(inputValue)) {
      Toast.info(t("qsrbdzcdhsl"), 2000);
    } else if (parseFloat(inputValue) > parseFloat(inputMax)) {
      Toast.info(t(!isTransform ? "qbbdzcyebz" : "qbkypxzcyebz"), 2000);
    } else if (isTransform && outputValue > parseFloat(outputCurrencyBalance)) {
      Toast.info(t("bxcyebz"), 1000);
    } else if (getDep(inputValue) > token.decimal) {
      Toast.info(
        t("zdsrws", {
          decimal: token.decimal,
        }),
        2000
      );
    } else {
      setPendingTx(true);
      let itankContract;
      switch (selectCurrency) {
        case "ETH-PETH":
          itankContract = parasset?.contracts["PETHInsPool"];
          break;
        case "HBTC-PBTC":
          itankContract = parasset?.contracts["PBTCInsPool"];
          break;
        case "USDT-PUSD":
          itankContract = parasset?.contracts["PUSDInsPool"];
          break;
      }

      const result = await onExchange(
        itankContract,
        inputValue,
        token.decimal,
        isTransform,
        selectInputCurrency === "ETH"
      );
      setPendingTx(false);
      if (result !== "0") {
        setInputValue("");
        setOutputValue("");
      }
    }
  }, [
    inputMax,
    inputValue,
    outputValue,
    parasset?.externalTokens,
    parasset?.contracts,
    isTransform,
    selectCurrency,
    selectInputCurrency,
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
      <Card className="wing-blank-lg bg-white">
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
          onFocus={(e) => {
            onFocus(e, setInputValue);
          }}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={inputCurrencyValue} prefix="$" />
        </div>
        <Spacer size="sm" />
        <StyledExchangeImg className="text-center">
          <img
            alt="image"
            src={require("../../../assets/svg/change_icon.svg")}
            width="70"
            height="70"
            className="center-block cursor-pointer"
            onClick={onTransformCurrency}
          />
        </StyledExchangeImg>

        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>{t("dao")}</div>
          <div>
            {t("hcxe")}
            <span
              className={`color-dark ${
                isTransform ? "text-underline cursor-pointer" : ""
              }`}
              onClick={() => {
                if (isTransform) {
                  calcAmount({
                    value: outputCurrencyBalance,
                    isInput: false,
                  });
                }
              }}
            >
              {!isTransform ? (
                t("buxian")
              ) : (
                <Value value={outputCurrencyBalance} decimals={6} />
              )}
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
          isInputCurrencySelect={true}
          value={outputValue}
          handleChange={handleChangeOutputValue}
          onBlur={(e) => {
            onBlur(e, setOutputValue);
          }}
          onFocus={(e) => {
            onFocus(e, setOutputValue);
          }}
        />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">
          ≈ <Value value={outputCurrencyValue} prefix="$" />
        </div>
        <Spacer />
        <Label
          label={t("dhbl")}
          value={`1 ${selectCurrency.split("-")[0]}=1 ${
            selectCurrency.split("-")[1]
          }`}
          className="wing-blank-lg"
        />
        <Spacer />
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
      <Spacer />
      {selectCurrency === "ETH-PETH" && (
        <BtnLink text={t("wbxctgldx")} path={`/itank/detail/PETHInsPool`} />
      )}
      {selectCurrency === "USDT-PUSD" && (
        <BtnLink text={t("wbxctgldx")} path={`/itank/detail/PUSDInsPool`} />
      )}
      {selectCurrency === "HBTC-PBTC" && (
        <BtnLink text={t("wbxctgldx")} path={`/itank/detail/PBTCInsPool`} />
      )}
    </>
  );
};
const StyledExchangeImg = styled.div`
  margin-top: -10px;
  margin-bottom: 10px;
`;
export default Specie;
