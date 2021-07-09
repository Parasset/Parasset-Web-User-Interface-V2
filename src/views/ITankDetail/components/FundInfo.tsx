//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Account from "./Account";
import useIsMobile from "../../../hooks/useIsMobile";
const FundInfo: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation()
  return (
    <>
      <Card className={` ${isMobile ? "wing-blank" : "wing-blank-lg"} `}>
        <Spacer size="mmd" />
        <div className={` ${isMobile ? "" : "wing-blank"} `}>
          <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
            <div className="flex-jc-center">
              <div className="color-grey">{t("bxjjzh")}</div>
              <div>
                <span className="color-grey">{t("dqjz")}</span>
                <span className="text-underline">1.023846</span>
              </div>
            </div>
          </div>
          <Spacer size="mmd" />
          <Account
            icon={require("../../../assets/img/USDT.png")}
            currency="USDT"
          />

          <Spacer />
          <Account
            icon={require("../../../assets/img/PUSD.png")}
            currency="PUSD"
          />
        </div>

        <Spacer size="mmd" />
      </Card>
    </>
  );
};

export default FundInfo;
