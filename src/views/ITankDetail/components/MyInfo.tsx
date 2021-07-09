//@ts-nocheck
import React from "react";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Account from "./Account";
import useIsMobile from "../../../hooks/useIsMobile";
const MyInfo: React.FC = ({  }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation()
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
            icon={require("../../../assets/img/USDT.png")}
            currency="USDT"
          />

          <Spacer />
          <Account
            icon={require("../../../assets/img/PUSD.png")}
            currency="PUSD"
          />
          <Spacer />
          <Label
            label={`${t("wdfe")} ( LP-USD )`}
            value="10,000"
            className="wing-blank-lg"
          />
          <Spacer size="mmd" />
          <Label label={t("wdzb")}value="2%" className="wing-blank-lg" />
          <Spacer size="mmd" />
          <div className="flex-jc-center">
            <Button variant="secondary" text={`${t('sq')} USDT`} width="47%" />
            <Button variant="tertiary" text={t("tq")} width="47%" />
          </div>
          <Spacer />
          <div className="text-center">
            <a href="" className="color-light-blue">
              {t('zywa')}
            </a>
          </div>
          <Spacer />
          <div className="color-grey text-center">
          {t('shuoming')}
            
          </div>
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer />
    </>
  );
};

export default MyInfo;
