//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  getNumberToMax,
  getNumberToAll,
  getDisplayNumber,
} from "../../utils/formatBalance";
import useIsMobile from "../../hooks/useIsMobile";
import Back from "../../components/Back";
import MyInfo from "./components/MyInfo";
import FundInfo from "./components/FundInfo";
import useItank from "../../hooks/itank/useItank";
import useItankInfo from "../../hooks/itank/useItankInfo";
import useTokenBalance from "../../hooks/useTokenBalance";
import DepositModal from "./components/DepositModal";
import WithdrawModal from "./components/WithdrawModal";
const Mine: React.FC = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const { t } = useTranslation();
  const { itankId } = useParams();
  const itank = useItank(itankId);
  const { itankInfo, lastDate, redeemAmount } = useItankInfo(itank);
  const myShare = useTokenBalance(itank?.itankContract);
  const depositBalance = useTokenBalance(itank?.depositToken);
  return (
    <>
      <Back
        text={`${itank?.name} LP ${t("kuangchi")} `}
        img={itank.icon1}
        img1={itank.icon2}
      />
      <div className="wing-blank-xl">
        <MyInfo
          itankInfo={itankInfo}
          itank={itank}
          myShare={myShare}
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
        key={isDepositOpen+'isDepositOpen'}
        depositBalance={depositBalance}
      />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        itank={itank}
        itankInfo={itankInfo}
        onDismiss={() => setIsWithdrawOpen(false)}
        key={isWithdrawOpen+'isWithdrawOpen'}
        redeemAmount={redeemAmount}
        lastDate={lastDate}
      />
    </>
  );
};

export default Mine;
