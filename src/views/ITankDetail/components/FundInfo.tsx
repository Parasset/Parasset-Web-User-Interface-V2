//@ts-nocheck
import React from "react";

import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Account from "./Account";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";
const FundInfo: React.FC = ({ itank, itankInfo }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Card
        className={`bg-white ${isMobile ? "wing-blank" : "wing-blank-lg"} `}
      >
        <Spacer size="mmd" />
        <div className={` ${isMobile ? "" : "wing-blank"} `}>
          <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
            <div className="flex-jc-center">
              <div className="color-grey">{t("bxjjzh")}</div>
              <div>
                <span className="color-grey">{t("dqjz")}：</span>
                <span className="text-underline ">
                  <Value
                    value={itankInfo.perShare}
                    decimals={6}
                    placeholder={true}
                  />
                </span>
              </div>
            </div>
          </div>
          <Spacer size="mmd" />
          <Account
            currency={itank.depositTokenName}
            value={itankInfo.depositFundBalance}
            dollarValue={itankInfo.depositFundValue}
          />

          <Spacer />
          <Account
            currency={itank.earnTokenName}
            value={itankInfo.earnFundBalance}
            dollarValue={itankInfo.earnFundValue}
          />
        </div>

        <Spacer size="mmd" />
      </Card>
    </>
  );
};

export default FundInfo;
