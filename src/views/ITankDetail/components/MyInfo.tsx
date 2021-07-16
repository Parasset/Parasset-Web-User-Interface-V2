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
import useApprove from "../../../hooks/useApprove";
const MyInfo: React.FC = ({ itank, itankInfo, myShare }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const history = useHistory();

  const [pendingTx, setPendingTx] = useState(false);
  const [approveStatus, approve] = useApprove(
    itank?.depositToken,
    itank?.itankContract?.address
  );

  const myRatio = useMemo(() => {
    //我的LP余额除总供应
    const ratio = new BigNumber(myShare)
      .div(itankInfo.totalSupply)
      .times(100)
      .toNumber();
    return !Number.isFinite(ratio) ? 0 : ratio;
  }, [myShare, itankInfo.totalSupply]);

  const totalFund = useMemo(() => {
    // (持有的LP/LP 总供应)*保险池总资金
    const totalFund = new BigNumber(myShare)
      .div(itankInfo.totalSupply)
      .times(itankInfo.totalAssets)
      .toNumber();

    return !Number.isFinite(totalFund) ? 0 : totalFund;
  }, [myShare, itankInfo.totalSupply, itankInfo.totalAssets]);

  const myAssets = useMemo(() => {
    //   可以计算出你可以领取的资金数量x
    // - 如果x<=USDT数量，USDT显示为x，PUSD显示为0
    // - 如果x>USDT数量，USDT显示为保险池中USDT余额，PUSD显示为 x-保险池中USDT余额
    let depositAssets =
      totalFund <= itankInfo.depositFundValue
        ? totalFund
        : itankInfo.depositFundValue;
    let earnAssets =
      totalFund <= itankInfo.depositFundValue
        ? 0
        : new BigNumber(totalFund).minus(itankInfo.depositFundValue).toNumber();
    depositAssets = !Number.isFinite(depositAssets) ? 0 : depositAssets;
    earnAssets = !Number.isFinite(earnAssets) ? 0 : earnAssets;
    const isUSDT = itank.depositTokenName === "USDT";
    const avgPrice = itankInfo.avgPrice;
    let depositAssetsValue = isUSDT
      ? depositAssets * 1
      : new BigNumber(depositAssets).times(avgPrice).toNumber();
    let earnAssetsValue = isUSDT
      ? earnAssets * 1
      : new BigNumber(earnAssets).times(avgPrice).toNumber();
    depositAssets = !Number.isFinite(depositAssets) ? 0 : depositAssets;
    earnAssets = !Number.isFinite(earnAssets) ? 0 : earnAssets;
    depositAssetsValue = !Number.isFinite(depositAssetsValue)
      ? 0
      : depositAssetsValue;
    earnAssetsValue = !Number.isFinite(earnAssetsValue) ? 0 : earnAssetsValue;
    return {
      depositAssets,
      earnAssets,
      depositAssetsValue,
      earnAssetsValue,
    };
  }, [
    itank.depositTokenName,
    totalFund,
    itankInfo.depositFundValue,
    itankInfo.earnAssets,
    itankInfo.avgPrice,
  ]);
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
            label={`${t("wdfe")} (${itank.LPTokenName} )`}
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
            {itank.depositTokenName === "USDT" && approveStatus ? (
              <>
                <Button
                  variant="secondary"
                  text={`${t("sq")} ${itank.depositTokenName}`}
                  width="47%"
                  disabled={pendingTx}
                  onClick={async () => {
                    setPendingTx(true);
                    await approve();
                    setPendingTx(false);
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  text={`${t("sq")} USDT`}
                  width="47%"
                />
              </>
            )}

            <Button variant="tertiary" text={t("tq")} width="47%" />
          </div>
          <Spacer />
          <div className="text-center">
            {/* /mine/pool/PUSDInsPool */}
            <div
              onClick={() => {
                history.push(`/mine/pool/${itank.contract}`);
              }}
              className="color-light-blue"
            >
              {t("zywa")}
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
