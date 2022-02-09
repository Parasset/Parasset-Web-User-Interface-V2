import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import useIsMobile from "../../../hooks/useIsMobile";

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <Spacer/>
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `}>
        {isMobile ? <Spacer size="mmd"/> : null}

        {isMobile ? <Spacer size="mmd"/> : null}
        <div
          className={` flex-wrap ${
            isMobile ? "wing-blank flex-jc-center" : "flex-jc-start flex1"
          } `}
        >
          <a
            href="https://t.me/parasset_chat"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/telegram_icon.png")}
              width="22"
              height="22"
            />
          </a>
          <a
            href="https://twitter.com/Parasset2021"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/twitter_icon.png")}
              width="22"
              height="22"
            />
          </a>
          <a
            href="https://github.com/Parasset"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/github_icon.png")}
              width="22"
              height="22"
            />
          </a>
          <a
            href="https://parasset2021-55646.medium.com/"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/medium_icon.png")}
              width="22"
              height="22"
            />
          </a>
          <a
            href="https://www.parasset.top/file/Certik_Parasset_final.pdf"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/audit_icon.png")}
              width="22"
              height="22"
            />
          </a>
          <a
            href="https://www.parasset.top/file/Parasset_WhitePaper.pdf"
            target="_blank"
            className={` ${
              isMobile ? "flex-row-center-center width-33" : "margin-right-20"
            } `}
          >
            <StyledItemImg
              src={require("../../../assets/img/whitepaper_icon.png")}
              width="22"
              height="22"
            />
          </a>
        </div>
      </div>
    </>
  );
};
const StyledItemImg = styled.img`
  margin-bottom: 10px;
`;


export default Footer;
