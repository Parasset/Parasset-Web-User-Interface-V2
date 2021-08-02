//@ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Value from "../../../components/Value";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../../utils/utils";
const Info: React.FC = ({ debt, debtInfo }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Card className="wing-blank-lg">
        <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
          <div className={` ${isMobile ? "" : "flex1 bd-right1 "} `}>
            <Spacer size={isMobile ? "mmd" : "md"} />
            <div className="color-grey">{t("qsjg")}</div>
            <div className="">
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="font-size-24 bold-600 text-center">
                <Value value={debtInfo?.liqPrice} suffix={debt.liqUnit} />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="flex-jc-center">
                <Label
                  className="debt-header-info"
                  label={t("dqjg", {
                    tokenName1: debt.depositTokenName,
                    tokenName2: debt.liqUnit,
                  })}
                  value={
                    <>
                      <Spacer size="ssm" />
                      <Spacer size="ssm" />
                      <Value
                        value={debtInfo?.mortgageToParassetPrice}
                        suffix="USDT"
                      />
                    </>
                  }
                />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
            </div>
            {isMobile ? null : <Spacer size={isMobile ? "mmd" : "md"} />}
          </div>
          <div className={`${isMobile ? "" : "flex1  "} `}>
            <Spacer size={isMobile ? "mmd" : "md"} />
            <div className="color-grey">{t("dqdyl")}</div>
            <div className="">
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="font-size-24 bold-600 text-center">
                <Value value={debtInfo?.rate} decimals={2} suffix="%" />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="flex-jc-center">
                <Label
                  className="debt-header-info"
                  label={t("qsdyl")}
                  value={
                    <>
                      <Spacer size="ssm" />
                      <Spacer size="ssm" />
                      <Value
                        value={$isPositiveNumber(
                          $isFiniteNumber(debtInfo?.liqRatio * 100)
                        )}
                        suffix="%"
                      />
                    </>
                  }
                />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
            </div>
            {isMobile ? null : <Spacer size={isMobile ? "mmd" : "md"} />}
          </div>
        </div>
      </Card>
      <Spacer />
    </>
  );
};

export default Info;
