//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { useHistory } from "react-router-dom";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Value from "../../../components/Value";
import Account from "./Account";
import useIsMobile from "../../../hooks/useIsMobile";

const MyInfo: React.FC = ({
  itank,
  itankInfo,
  myShare,
  myRatio,
  totalFund,
  myAssets,
  onOpenDepositModal,
  onOpenWithdrawModal,
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const history = useHistory();

  const [pendingTx, setPendingTx] = useState(false);

  return (
    <>
      <Card className={` ${isMobile ? "wing-blank" : "wing-blank-lg"} `}>
        <Spacer size="mmd" />

        <div className={` ${isMobile ? "" : "wing-blank"} `}>
          <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
            <div className="color-grey">{t("wdbxzh")}</div>
          </div>
          <Spacer size="mmd" />

          <Account
            currency={itank.depositTokenName}
            value={myAssets.depositAssets}
            dollarValue={myAssets.depositAssetsValue}
          />

          <Spacer />
          <Account
            currency={itank.earnTokenName}
            value={myAssets.earnAssets}
            dollarValue={myAssets.earnAssetsValue}
          />
          <Spacer />
          <Label
            label={`${t("wdfe")} (${itank.LPTokenName})`}
            value={<Value value={myShare} decimals={6} />}
            className="wing-blank-lg"
          />
          <Spacer size="mmd" />
          <Label
            label={t("wdzb")}
            value={<Value value={myRatio} suffix="%" />}
            className="wing-blank-lg"
          />
          <Spacer size="mmd" />
          <div className="flex-jc-center">
        
            <Button
              variant="secondary"
              text={`${t("zhuru")}`}
              width="47%"
              onClick={onOpenDepositModal}
            />
            <Button
              variant="tertiary"
              text={t("tq")}
              width="47%"
              onClick={onOpenWithdrawModal}
            />
          </div>
          <Spacer />
          <div className="text-center">
         
            <div
              onClick={() => {
                history.push(`/mine/pool/${itank.contract}`);
              }}
              className="color-light-blue"
            >
              {t("zywa", {
                lpToken: itank.LPTokenName,
                token: itank.earnName,
              })}
            </div>
          </div>
          <Spacer />
          <div className="color-grey text-center">{t("shuoming")}</div>
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer />
    </>
  );
};

export default MyInfo;
