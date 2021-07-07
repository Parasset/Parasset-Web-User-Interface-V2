import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import Spacer from "../../Spacer";
const Right: React.FC = () => {
  const { t } = useTranslation();
  return (
    <StyledNavRight>
      <StyledWallet className="flex-row-center-center bd-bottom wing-blank-lg ">
        <Button text={t('ljqb')} variant="secondary" />
      </StyledWallet>
      <div className="wing-blank-lg">
        <div className="bd-bottom">
          <StyledLabel>{t('jiage')}</StyledLabel>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/ETH_icon.png")}
                width="25"
                height="25"
              />
              <img
                src={require("../../../assets/img/USDT_icon.png")}
                width="25"
                height="25"
                className="margin-left-minus-10"
              />
            </div>
            <div className="margin-left-10">
              <div>1,200.45</div>
              <div>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/NEST_icon.png")}
                width="25"
                height="25"
              />
              <img
                src={require("../../../assets/img/USDT_icon.png")}
                width="25"
                height="25"
                className="margin-left-minus-10"
              />
            </div>
            <div className="margin-left-10">
              <div>1,200.45</div>
              <div>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/NEST_icon.png")}
                width="25"
                height="25"
              />
              <img
                src={require("../../../assets/img/ETH_icon.png")}
                width="25"
                height="25"
                className="margin-left-minus-10"
              />
            </div>
            <div className="margin-left-10">
              <div>1,200.45</div>
              <div>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
        </div>
        <div className="">
          <StyledLabel>{t('ltl')}</StyledLabel>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/PETH_icon.png")}
                width="25"
                height="25"
              />
            </div>
            <div className="margin-left-10">
              <div>1,200.45</div>
              <div>PETH</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <img
                src={require("../../../assets/img/PETH_icon.png")}
                width="25"
                height="25"
              />
            </div>
            <div className="margin-left-10">
              <div>1,200.45</div>
              <div>PUSD</div>
            </div>
          </div>
        </div>
      </div>
    </StyledNavRight>
  );
};

const StyledNavRight = styled.div`
  background-color: ${(props) => props.theme.color.grey[100]};
  border-left: 1px solid ${(props) => props.theme.color.grey[200]};
  min-height: 100vh;
  width: 180px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledWallet = styled.div`
  height: 90px;
`;
const StyledLabel = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;

export default Right;
