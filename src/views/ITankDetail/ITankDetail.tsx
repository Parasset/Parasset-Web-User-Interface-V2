//@ts-nocheck
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
import BigNumber from "bignumber.js";
import Back from "../../components/Back";
import MyInfo from "./components/MyInfo";
import FundInfo from "./components/FundInfo";
import useItank from "../../hooks/itank/useItank";
import useItankInfo from "../../hooks/itank/useItankInfo";
import useTokenBalance from "../../hooks/useTokenBalance";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
const ITankDetail: React.FC = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { t } = useTranslation();
  const { itankId } = useParams();
  const itank = useItank(itankId);
  const { itankInfo, lastDate, redeemAmount } = useItankInfo(itank);
  const myShare = useTokenBalance(itank?.itankContract);
  const depositBalance = useTokenBalance(itank?.depositToken);

  const myRatio = useMemo(() => {
    //我的LP余额除总供应
    const ratio = new BigNumber(myShare)
      .div(itankInfo.totalSupply)
      .times(100)
      .toNumber();
    return $isPositiveNumber($isFiniteNumber(ratio));
  }, [myShare, itankInfo.totalSupply]);

  const totalFund = useMemo(() => {
    // (持有的LP/LP 总供应)*保险池总资金
    const totalFund = new BigNumber(myShare)
      .div(itankInfo.totalSupply)
      .times(itankInfo.totalAssets)
      .toNumber();

    return $isFiniteNumber(totalFund);
  }, [myShare, itankInfo.totalSupply, itankInfo.totalAssets]);

  const myAssets = useMemo(() => {
    //   可以计算出你可以领取的资金数量x
    // - 如果x<=USDT数量，USDT显示为x，PUSD显示为0
    // - 如果x>USDT数量，USDT显示为保险池中USDT余额，PUSD显示为 x-保险池中USDT余额

    let depositAssets =
      totalFund <= itankInfo.depositFundBalance
        ? totalFund
        : itankInfo.depositFundBalance;
    let earnAssets =
      totalFund <= itankInfo.depositFundBalance
        ? 0
        : new BigNumber(totalFund)
            .minus(itankInfo.depositFundBalance)
            .toNumber();
    depositAssets = $isFiniteNumber(depositAssets);
    earnAssets = $isFiniteNumber(earnAssets);
    const isUSDT = itank.depositTokenName === "USDT";
    const avgPrice = itankInfo.avgPrice;
    let depositAssetsValue = isUSDT
      ? depositAssets * 1
      : new BigNumber(depositAssets).times(avgPrice).toNumber();
    let earnAssetsValue = isUSDT
      ? earnAssets
      : new BigNumber(earnAssets).times(avgPrice).toNumber();
    depositAssets = $isPositiveNumber($isFiniteNumber(depositAssets));
    earnAssets = $isPositiveNumber($isFiniteNumber(earnAssets));
    depositAssetsValue = $isPositiveNumber($isFiniteNumber(depositAssetsValue));
    earnAssetsValue = $isPositiveNumber($isFiniteNumber(earnAssetsValue));
    return {
      depositAssets,
      earnAssets,
      depositAssetsValue,
      earnAssetsValue,
    };
  }, [
    itank.depositTokenName,
    totalFund,
    itankInfo.depositFundBalance,
    itankInfo.earnAssets,
    itankInfo.avgPrice,
  ]);

  return (
    <>
      <Back
        text={`${itank?.name}  ${t("bxc")} `}
        img={itank.icon1}
        img1={itank.icon2}
      />
      <div className="wing-blank-xl">
        <MyInfo
          itankInfo={itankInfo}
          itank={itank}
          myShare={myShare}
          myRatio={myRatio}
          totalFund={totalFund}
          myAssets={myAssets}
          onOpenDepositModal={() => setIsDepositOpen(true)}
          onOpenWithdrawModal={() => setIsWithdrawOpen(true)}
        />
        <FundInfo itankInfo={itankInfo} itank={itank} />
      </div>
      <DepositModal
        isOpen={isDepositOpen}
        itank={itank}
        itankInfo={itankInfo}
        onDismiss={() => setIsDepositOpen(false)}
        key={isDepositOpen + "isDepositOpen"}
        depositBalance={depositBalance}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        itank={itank}
        itankInfo={itankInfo}
        onDismiss={() => setIsWithdrawOpen(false)}
        key={isWithdrawOpen + "isWithdrawOpen"}
        redeemAmount={redeemAmount}
        lastDate={lastDate}
        myShare={myShare}
        myRatio={myRatio}
        totalFund={totalFund}
        myAssets={myAssets}
      />
    </>
  );
};

export default ITankDetail;
