//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import useIsMobile from "../../../hooks/useIsMobile";
const Harvest: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <StyledWrapBox className={`wing-blank-lg ${isMobile ? "" : "width-47"} `}>
        <Spacer size="mmd" />
        <div className="color-grey">{t("wdsy")}</div>
        <Spacer />
        <div className="wing-blank-llg  text-center">
          <img
            src={require("../../../assets/img/ASETToken_icon.png")}
            width="40"
            height="40"
          />
          <Spacer size="sm" />
          <div className="font-size-24 bold-600">10,000</div>
          <Spacer size="sm" />
          <div className="color-grey">{t("dlqsy")} ( ASET )</div>
          <Spacer />
          <Button text={t("lqsy")} variant="secondary" />
        </div>

        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};

const StyledWrapBox = styled(Card)`
  height: 260px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export default Harvest;
