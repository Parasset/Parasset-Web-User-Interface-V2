import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
const Footer: React.FC = () => {
  return (
    <div className="wing-blank-lg ">
      <div className="bd-bottom width-100">
        <Spacer size="mmd" />
        <div className="color-grey text-center">
          抵押你的加密资产铸造平行资产
        </div>
        <Spacer size="mmd" />
        <div className="wing-blank flex-jc-center flex-wrap ">
          <div className=" flex-row-center-center width-33">
            <StyledItemImg
              src={require("../../../assets/img/telegram_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div className=" flex-row-center-center width-33 ">
            <StyledItemImg
              src={require("../../../assets/img/twitter_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div className=" flex-row-center-center width-33 ">
            <StyledItemImg
              src={require("../../../assets/img/git_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div className=" flex-row-center-center width-33">
            <StyledItemImg
              src={require("../../../assets/img/Medium_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div className=" flex-row-center-center width-33">
            <StyledItemImg
              src={require("../../../assets/img/audit_icon.png")}
              width="30"
              height="30"
            />
          </div>
          <div className="flex-row-center-center width-33">
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
