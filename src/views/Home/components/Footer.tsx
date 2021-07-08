import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import useIsMobile from "../../../hooks/useIsMobile";
const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <div className="wing-blank-lg ">
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `} >
        {isMobile ? <Spacer size="mmd" /> : null}

        <div className="color-grey text-center">
          {t('dypxzc')}
        </div>
        {isMobile ? <Spacer size="mmd" /> : null}
        <div  className={` flex-wrap ${isMobile ? "wing-blank flex-jc-center" : "flex-jc-end flex1"} `}>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/telegram_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/twitter_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/git_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/Medium_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/audit_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div  className={` ${isMobile ? "flex-row-center-center width-33" : "margin-left-10"} `}>
            <StyledItemImg
              src={require("../../../assets/img/whitepaper_icon.png")}
              width="30"
              height="30"
            />
          </div>
        </div>
        <div className="space-white-lg"></div>
      </div>
    </div>
  );
};
const StyledItemImg = styled.img`
  margin-bottom: 10px;
`;

export default Footer;
