//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Value from "../../../components/Value";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";
const Info: React.FC = ({ mine, mineInfo }) => {
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
              value={<Value value={mineInfo.info.totalSupply} />}
              className={` ${isMobile ? "" : "width-47"} `}
            />
            {isMobile ? <Spacer size="mmd" /> : null}
            <Label
              label={`${t("rcl")} ( ${mine.earnTokenName} )`}
              value={<Value value={mineInfo.info.rewardRate} />}
              className={` ${isMobile ? "" : "width-47"} `}
            />
          </div>
          <Spacer size="mmd" />
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <Label
              label="TVL"
              // tvl, apy
              value={<Value value={mineInfo.tvl} prefix="$" />}
              className={` ${isMobile ? "" : "width-47"} `}
            />
            {isMobile ? <Spacer size="mmd" /> : null}
            <Label
              label="APY"
              value={<Value value={mineInfo.apy} suffix="%" />}
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
