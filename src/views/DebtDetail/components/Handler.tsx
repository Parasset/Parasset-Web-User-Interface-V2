//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import TokenSymbol from "../../../components/TokenSymbol";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import Button from "../../../components/Button";
import OperatModal from "./OperatModal";
import useIsMobile from "../../../hooks/useIsMobile";
import useTokenBalance from "../../../hooks/useTokenBalance";

const Handler: React.FC = ({ debt, debtInfo,fetchInfo }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const [max, setMax] = useState(0);
  const [select, setSelect] = useState("Stake");
  const mortgageBalance = useTokenBalance(debt?.mortgageToken)
  const parassetBalance = useTokenBalance(debt?.uToken)
  const openModal = useCallback((select,max) => {
    setMax(max)
    setSelect(select);
    setOpen(true);
  }, []);
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer size="mmd" />
        <div className="bd-bottom">
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <div
              className={`wing-blank-lg ${isMobile ? "" : "flex1 bd-right1 "} `}
            >
              <div className="color-grey">{t("dyzc")}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <TokenSymbol symbol={debt.icon1} size={40} />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  <Value value={debtInfo.mortgageAssets} decimals={6} />
                  {debt.depositTokenName}
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label
                    label={t("shizhi")}
                    value={<Value value={debtInfo.mortgageValue} prefix="$" />}
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />

                <Button
                  text={t("diya")}
                  variant="secondary"
                  onClick={() => {
                    openModal("Stake",mortgageBalance);
                  }}
                />
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
            <div className="flex1 wing-blank-lg">
              <div className="color-grey">{t("yzbsl")}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <TokenSymbol symbol={debt.icon2} size={40} />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  <Value value={debtInfo.parassetAssets} decimals={6} />
                  {debt.earnTokenName}
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label
                    label={t("shizhi")}
                    value={<Value value={debtInfo.parassetValue} prefix="$" />}
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <Button text={t("changhuan")} variant="secondary"  onClick={() => {
                    openModal("Repay",debtInfo.parassetAssets);
                  }} />
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
          </div>
          <Spacer size={isMobile ? "mmd" : "md"} />
        </div>
        <div>
          <Spacer size={isMobile ? "mmd" : "md"} />
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <div
              className={`wing-blank-lg ${isMobile ? "" : "flex1 bd-right1 "} `}
            >
              <div className="color-grey">{t("ksh")}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <TokenSymbol symbol={debt.icon1} size={40} />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  <Value value={debtInfo.maxSubM} decimals={6} />
                  {debt.depositTokenName}
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label
                    label={t("shizhi")}
                    value={<Value value={debtInfo.maxSubMValue} prefix="$" />}
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <Button text={t("shuhui")} variant="secondary"  onClick={() => {
                    openModal("Redeem",debtInfo.maxSubM);
                  }} />
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
            <div className="flex1 wing-blank-lg">
              <div className="color-grey">{t("kzb")}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <TokenSymbol symbol={debt.icon2} size={40} />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  <Value value={debtInfo.maxAddP} decimals={6} />
                  {debt.earnTokenName}
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label
                    label={t("shizhi")}
                    value={<Value value={debtInfo.maxAddPValue} prefix="$" />}
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <Button text={t("zhubi")} variant="secondary"   onClick={() => {
                    openModal("Mint",debtInfo.maxAddP);
                  }}/>
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
          </div>
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer size={isMobile ? "mmd" : "md"} />
      <OperatModal
        isOpen={isOpen}
        debt={debt}
        select={select}
        debtInfo={debtInfo}
        parassetBalance={parassetBalance}
        mortgageBalance={mortgageBalance}
        fetchInfo={fetchInfo}
        max={max}
        key={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Handler;
