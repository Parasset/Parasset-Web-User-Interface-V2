//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";
const Info: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer size="mmd" />
        <div className="color-grey">{t("kcgl")}</div>
        <div className="wing-blank">
          <Spacer />
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <Label
              label={`${t("dys")} ( LP-USD )`}
              value="564,564.68"
              className={` ${isMobile ? "" : "width-47"} `}
            />
            {isMobile ? <Spacer size="mmd" /> : null}
            <Label
              label={`${t("rcl")} ( ASET )`}
              value="253"
              className={` ${isMobile ? "" : "width-47"} `}
            />
          </div>
          {isMobile ? <Spacer size="mmd"/> : null}
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <Label
              label="TVL"
              value="$ 564,564.68"
              className={` ${isMobile ? "" : "width-47"} `}
            />
            {isMobile ? <Spacer size="mmd" /> : null}
            <Label
              label="APY"
              value="102.47%"
              className={` ${isMobile ? "" : "width-47"} `}
            />
          </div>
          <Spacer />
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer />
    </>
  );
};

export default Info;
