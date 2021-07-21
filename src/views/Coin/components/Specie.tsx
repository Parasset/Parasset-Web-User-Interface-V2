//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";

import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import useBlur from "../../../hooks/useBlur";
import useApprove from "../../../hooks/useApprove";
const Specie: React.FC = ({}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(0);
  const [outputValue, setOutputValue] = useState(0);

  const [showInputCurrencySelect, setShowInputCurrencySelect] = useState(false);

  const [selectInputCurrency, setSelectInputCurrency] = useState("ETH");

  const [showOutputCurrencySelect, setShowOutputCurrencySelect] = useState(
    false
  );
  const [selectOutputCurrency, setSelectOutputCurrency] = useState("PETH");

  const { onBlur } = useBlur();

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
  }, [PETHWalletBalance, PUSDWalletBalance]);

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
            <span className="color-dark text-underline">23.3333</span>
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
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
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
          label={t("heyue")}
          value="0x4657df32…675df23b"
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
        <Label label={t("wdf")} value="0.01 PUSD" className="wing-blank-lg" />
        <Spacer />
        <Button text={t("zhubi")} variant="secondary" />
        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};

export default Specie;
