//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip, Slider } from "antd";
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
import useFocus from "../../../hooks/useFocus";
import useApprove from "../../../hooks/useApprove";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useBasisCash from "../../../hooks/useBasisCash";

import usePrice from "../../../hooks/coin/usePrice";
import useMaxRatio from "../../../hooks/coin/useMaxRatio";
import useFee from "../../../hooks/coin/useFee";
import useCoin from "../../../hooks/coin/useCoin";
import useCallbackState from "../../../hooks/useCallbackState";

import {
  getDep,
  $isFiniteNumber,
  $isPositiveNumber,
  getEncryptAddress,
} from "../../../utils/utils";
import { getNumberToFixed, updateNumDep } from "../../../utils/formatBalance";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();

  const { onCoin } = useCoin();
  const {
    selectInputCurrency: inputCurrency,
    selectOutputCurrency: outputCurrency,
  } = useParams();
  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();

  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);
  const [ratio, setRatio] = useCallbackState(50);
  const [pendingTx, setPendingTx] = useState(false);
  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false);

  const [selectInputCurrency, setSelectInputCurrency] = useState("ETH");

  const [showOutputCurrencySelect, setShowOutputCurrencySelect] = useState(
    false
  );
  const [selectOutputCurrency, setSelectOutputCurrency] = useState("PUSD");

  const { onBlur } = useBlur();
  const { onFocus } = useFocus();
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
    basisCash?.externalTokens["PETH"]
  );

  const isETH = useMemo(() => {
    return selectInputCurrency === "ETH" || setSelectOutputCurrency === "ETH";
  }, [selectInputCurrency, setSelectOutputCurrency]);

  const ETHWalletBalance = useTokenBalance(basisCash?.externalTokens["ETH"]);
  const NESTWalletBalance = useTokenBalance(basisCash?.externalTokens["NEST"]);
  const PETHWalletBalance = useTokenBalance(basisCash?.externalTokens["PETH"]);
  const PUSDWalletBalance = useTokenBalance(basisCash?.externalTokens["PUSD"]);

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
      ETH: $isPositiveNumber(
        $isFiniteNumber(
          getNumberToFixed(new BigNumber(ETHWalletBalance).minus(0.025))
        )
      ),
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
    var max = $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(ETHWalletBalance).minus(0.025).toFixed(18, 1)
      )
    );

    var canBuyAmount = isETH ? max : inputCurrencyBalance;
    const amount = new BigNumber(canBuyAmount);
    return amount.toFixed(getDep(amount), 1);
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
        walletBalance: PUSDWalletBalance,
      },
      NESTPUSD: {
        maxRatio: maxRatioNESTPUSD,
        price: NESTToUSDTPrice,
        fee: feeNESTPUSD,
        mortgagePoolContract: basisCash?.contracts["PUSDMorPool"],
        mortgageToken: basisCash?.externalTokens["NEST"],
        walletBalance: PUSDWalletBalance,
      },
      NESTPETH: {
        maxRatio: maxRatioNESTPETH,
        price: NESTToETHPrice,
        fee: feeNESTPETH,
        mortgagePoolContract: basisCash?.contracts["PETHMorPool"],
        mortgageToken: basisCash?.externalTokens["NEST"],
        walletBalance: PETHWalletBalance,
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
    PUSDWalletBalance,
    PETHWalletBalance,
  ]);

  const calcRatio = useMemo(() => {
    return getNumberToFixed(new BigNumber(ratio).div(100));
  }, [ratio]);

  const isExceeds = useMemo(() => {
    const { maxRatio } = dataList[selectInputCurrency + selectOutputCurrency];
    return new BigNumber(calcRatio).gt(maxRatio);
  }, [calcRatio, dataList, selectInputCurrency, selectOutputCurrency]);

  const maxRatio = useMemo(() => {
    const { maxRatio } = dataList[selectInputCurrency + selectOutputCurrency];
    return !maxRatio
      ? 70
      : parseInt(new BigNumber(maxRatio).times(100).toNumber());
  }, [dataList, selectInputCurrency, selectOutputCurrency]);

  const fee = useMemo(() => {
    const fee = dataList[selectInputCurrency + selectOutputCurrency].fee;
    return fee;
  }, [dataList, selectInputCurrency, selectOutputCurrency]);

  const [approveStatusPUSD, approvePUSD] = useApprove(
    basisCash?.externalTokens["PUSD"],
    basisCash?.contracts["PUSDMorPool"]?.address,
    fee
  );

  const [approveStatusPETH, approvePETH] = useApprove(
    basisCash?.externalTokens["PETH"],
    basisCash?.contracts["PETHMorPool"]?.address,
    fee
  );
  const [approveStatusNESTPETH, approveNESTPETH] = useApprove(
    basisCash?.externalTokens["NEST"],
    basisCash?.contracts["PETHMorPool"]?.address,
    inputValue
  );
  const [approveStatusNESTPUSD, approveNESTPUSD] = useApprove(
    basisCash?.externalTokens["NEST"],
    basisCash?.contracts["PUSDMorPool"]?.address,
    inputValue
  );

  const approveList = useMemo(() => {
    return {
      NESTPETH: {
        status: approveStatusNESTPETH,
        approve: approveNESTPETH,
      },
      NESTPUSD: {
        status: approveStatusNESTPUSD,
        approve: approveNESTPUSD,
      },
      PETH: {
        status: approveStatusPETH,
        approve: approvePETH,
      },

      PUSD: {
        status: approveStatusPUSD,
        approve: approvePUSD,
      },
    };
  }, [
    approveStatusPETH,
    approveStatusPUSD,
    approvePETH,
    approvePUSD,
    approveStatusNESTPETH,
    approveStatusNESTPUSD,
    approveNESTPETH,
    approveNESTPUSD,
  ]);

  const calcAmount = useCallback(
    ({ value, isInput, ratio, price }) => {
      const inputToken = basisCash?.externalTokens[selectInputCurrency];
      const outputToken = basisCash?.externalTokens[selectOutputCurrency];
      price =
        price !== undefined
          ? price
          : dataList[selectInputCurrency + selectOutputCurrency].price;

      ratio = ratio !== undefined ? ratio : calcRatio;
      if (isInput) {
        // NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice
        // X=输入的PUSD数量/(输入的ETH数量*ETH-USDT预言机价格) ETH铸币PUSD
        // X=输入的PUSD数量/(输入的NEST数量*NEST-USDT预言机价格) NEST铸币PUSD
        // X=输入的PETH数量/(输入的NEST数量*NEST-PETH预言机价格)  NEST铸币PETH
        // 若X大于NEST的最高抵押率（合约返回值），则红色显示前端计算的抵押率结果；铸币按钮灰色不可点击；若X小于等于NEST的最高抵押率，则可正常铸币
        // const ratio = new BigNumber(outputValue)
        //   .div(new BigNumber(inputValue).times(price))
        //   .toNumber();
        // return $isPositiveNumber($isFiniteNumber(ratio));

        let val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        val = updateNumDep(val, inputToken);

        setInputValue(val);
        const amount = new BigNumber(val).times(price).times(ratio);
        const outputAmount = $isPositiveNumber(
          $isFiniteNumber(getNumberToFixed(amount))
        );
        setOutputValue(updateNumDep(outputAmount, outputToken));
        console.log(value, val, outputAmount, price, ratio);
      } else {
        let val =
          value === "" ? value : $isPositiveNumber($isFiniteNumber(value));
        val = updateNumDep(val, outputToken);
        setOutputValue(val);

        const amount = new BigNumber(val).div(ratio).div(price);
        const inputAmount = $isPositiveNumber(
          $isFiniteNumber(getNumberToFixed(amount))
        );

        setInputValue(updateNumDep(inputAmount, inputToken));
      }
    },
    [
      calcRatio,
      basisCash?.externalTokens,
      dataList,
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
      calcRatio,
      basisCash?.externalTokens,
      dataList,
      selectInputCurrency,
      selectOutputCurrency,
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
      calcRatio,
      basisCash?.externalTokens,
      dataList,
      selectInputCurrency,
      selectOutputCurrency,
    ]
  );

  const onChangeInputCurrencySelect = useCallback(
    ({ id }, index) => {
      setSelectInputCurrency(id);
      //默认输出PUSD
      const outputId = currencyListOutput[0].id;
      setSelectOutputCurrency(outputId);
      const max = maxList[id];
      const value = parseFloat(inputValue) > max ? max : inputValue;
      setInputValue(value);
      let ratio = id === "ETH" ? 50 : 20;
      let rate = getNumberToFixed(new BigNumber(ratio).div(100));
      setRatio(ratio);
      const price = dataList[id + outputId].price;
      if (parseFloat(value)) {
        calcAmount({
          value,
          isInput: true,
          ratio: rate,
          price,
        });
        return;
      }
      if (parseFloat(outputValue)) {
        calcAmount({
          value: outputValue,
          isInput: false,
          ratio: rate,
          price,
        });
      }
    },
    [
      isETH,
      currencyListOutput,
      inputMax,
      maxList,
      inputValue,
      outputValue,
      calcRatio,
      basisCash?.externalTokens,
      dataList,
      selectInputCurrency,
      selectOutputCurrency,
    ]
  );

  const onChangeOutputCurrencySelect = useCallback(
    ({ id }) => {
      const price = dataList[selectInputCurrency + id].price;
      let rate = calcRatio;
      setSelectOutputCurrency(id);
      if (parseFloat(inputValue)) {
        calcAmount({
          value: inputValue,
          isInput: true,
          ratio: rate,
          price,
        });
        return;
      }
      if (parseFloat(outputValue)) {
        calcAmount({
          value: outputValue,
          isInput: false,
          ratio: rate,
          price,
        });
      }
    },
    [
      isETH,
      currencyListOutput,
      inputMax,
      maxList,
      inputValue,
      outputValue,
      calcRatio,
      basisCash?.externalTokens,
      dataList,
      selectInputCurrency,
      selectOutputCurrency,
    ]
  );

  const onConfirm = useCallback(async () => {
    const {
      mortgagePoolContract,
      mortgageToken,
      fee,
      maxRatio,
      walletBalance,
    } = dataList[selectInputCurrency + selectOutputCurrency];
    if (!parseFloat(inputValue)) {
      Toast.info(t("qsrdyyszc"), 1000);
    } else if (parseFloat(inputValue) > parseFloat(inputMax)) {
      Toast.info(t("qbkydyzcyebz"), 1000);
    } else if (parseFloat(ETHWalletBalance) < 0.01) {
      Toast.info(t("qbkyethbz"), 1000);
    } else if (!parseFloat(outputValue)) {
      Toast.info(t("qsrzbsl"), 1000);
    } else if (getDep(inputValue) > 18 || getDep(outputValue) > 18) {
      Toast.info(
        t("zdsrws", {
          decimal: 18,
        }),
        1000
      );
    } else if (new BigNumber(walletBalance).times(100).lt(fee)) {
      Toast.info(t("qbyebzjnwdf"), 1000);
    } else if (new BigNumber(calcRatio).times(100).lt(1) || isExceeds) {
      Toast.info(
        t("cgzddyl", {
          label: new BigNumber(maxRatio).times(100).toNumber(),
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
  const onChangeRatio = useCallback(
    (val) => {
      setRatio(val);
      const rate = getNumberToFixed(new BigNumber(val).div(100));
      if (parseFloat(inputValue)) {
        calcAmount({
          value: inputValue,
          isInput: true,
          ratio: rate,
        });
        return;
      }
      if (parseFloat(outputValue)) {
        calcAmount({
          value: outputValue,
          isInput: false,
          ratio: rate,
        });
        return;
      }
    },
    [
      inputValue,
      outputValue,
      basisCash?.externalTokens,
      dataList,
      selectInputCurrency,
      selectOutputCurrency,
    ]
  );

  useEffect(() => {
    if (inputCurrency) {
      setSelectInputCurrency(inputCurrency);
    }
    if (outputCurrency) {
      setSelectOutputCurrency(outputCurrency);
    }
  }, [inputCurrency, outputCurrency]);

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
        <div className=" wing-blank-lg">
          <Spacer size="sm" />
          <div className="color-grey">{t("dyl")}</div>
          <Spacer size="ssm" />

          <div id="slider">
            <Slider
              value={ratio}
              min={1}
              max={maxRatio}
              tooltipVisible
              getTooltipPopupContainer={document.getElementById("slider")}
              onChange={onChangeRatio}
            />
          </div>

          <div className="flex-jc-center color-grey">
            <div>1%</div>
            <div>{maxRatio}%</div>
          </div>
          <Spacer />
        </div>

        <div className="color-grey wing-blank-lg">
          <div> {t("zbsl")}</div>
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
        <Spacer size="mmd" />

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
        {/* <Label
          label={
            <Tooltip title={t("tip2")}>
              <div className="text-underline cursor-pointer">{t("yyjdyf")}</div>
            </Tooltip>
          }
          value="0.01 ETH"
          className="wing-blank-lg"
        />

        <Spacer size="mmd" /> */}
        <Label
          label={
            <Tooltip title={t("tip4")}>
              <div className="text-underline cursor-pointer">{t("wdf")}</div>
            </Tooltip>
          }
          className="wing-blank-lg"
          value={
            <Value value={fee} suffix={selectOutputCurrency} showAll={true} />
          }
        />
        <Spacer />
        {/* NESTPETH NESTPUSD 如果不是eth，就要授权给nest,然后看fee有没有大于0，大于0就需要授权 */}
        {/* inputCurrencyBalance */}
        {selectInputCurrency !== "ETH" &&
        approveList[selectInputCurrency + selectOutputCurrency].status ? (
          <Button
            text={`${t("sq")} ${selectInputCurrency}`}
            variant="secondary"
            disabled={pendingTx}
            onClick={async () => {
              setPendingTx(true);
              await approveList[
                selectInputCurrency + selectOutputCurrency
              ].approve();
              setPendingTx(false);
            }}
          />
        ) : !parseFloat(fee) ? (
          <Button
            text={t("zhubi")}
            variant="secondary"
            disabled={pendingTx || calcRatio <= 0}
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
            disabled={pendingTx || calcRatio <= 0}
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
