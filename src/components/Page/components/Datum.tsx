//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../Spacer";


const Datum: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <StyledLabel>{t('wdpxzc')}</StyledLabel>
      <div className="flex-jc-center">
        <div className="flex-jc-start">
          <img
            src={require(`../../../assets/img/PETH.png`)}
            width="25"
            height="25"
            className="margin-right-10"
          />
          <div>
            <div>PETH</div>
            <Spacer size="ssm" />
            <div className="flex-jc-start color-grey">
              <div>0x78…0550 </div>
              <img
                src={require("../../../assets/img/copy_icon.png")}
                width="16"
                height="16"
                className="margin-left-10"
              />
            </div>
            <div>20.4756</div>
          </div>
        </div>
      </div>
      <Spacer size="mmd" />
      <div className="flex-jc-center">
        <div className="flex-jc-start">
          <img
            src={require(`../../../assets/img/PUSD.png`)}
            width="25"
            height="25"
            className="margin-right-10"
          />
          <div>
            <div>PUSD</div>
            <Spacer size="ssm" />
            <div className="flex-jc-start color-grey">
              <div>0x78…0550 </div>
              <img
                src={require("../../../assets/img/copy_icon.png")}
                width="16"
                height="16"
                className="margin-left-10"
              />
            </div>
            <div>20.4756</div>
          </div>
        </div>
      </div>
      <Spacer size="mmd" />
      <div>
        <StyledLabel>{t('jiage')}</StyledLabel>
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/ETH.png")}
              width="25"
              height="25"
            />
            <img
              src={require("../../../assets/img/USDT.png")}
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
        <Spacer size="mmd" />
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/NEST.png")}
              width="25"
              height="25"
            />
            <img
              src={require("../../../assets/img/USDT.png")}
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
        <Spacer size="mmd" />
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/NEST.png")}
              width="25"
              height="25"
            />
            <img
              src={require("../../../assets/img/ETH.png")}
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
        <Spacer size="mmd" />
      </div>

      <div className="">
        <StyledLabel>{t('ltl')}</StyledLabel>
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/PETH.png")}
              width="25"
              height="25"
            />
          </div>
          <div className="margin-left-10">
            <div>1,200.45</div>
            <div>PETH</div>
          </div>
        </div>
        <Spacer size="mmd" />
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <img
              src={require("../../../assets/img/PUSD.png")}
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
  );
};
const StyledLabel = styled.div`
  height: 35px;
  display: flex;
  align-items: center;
`;

export default Datum;
