//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
const Specie: React.FC = ({  }) => {
  const { t } = useTranslation();
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
      <Card className="wing-blank-lg">
        <Spacer />
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>{t('cong')}</div>
          <div>
          {t('yue')}<span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />
        <StyledExchangeImg className="text-center">
          <img
            src={require("../../../assets/img/change_icon.png")}
            width="50"
            height="50"
            className="center-block"
          />
        </StyledExchangeImg>
        <div className="flex-jc-center color-grey wing-blank-lg">
          <div>{t('dao')}</div>
          <div>
          {t('yue')}<span className="color-dark text-underline">23.3333</span>
          </div>
        </div>
        <Spacer size="sm" />
        <Select />
        <Spacer size="sm" />
        <div className="text-right color-grey wing-blank-lg">≈ ＄0.01</div>
        <Spacer size="sm" />
        <Label label={t('dhbl')} value="1 ETH = 1200 PUSD" className="wing-blank-lg"/>
        <Spacer size="mmd" />
        <Label label={t('sxf')} value="0.01 PETH" className="wing-blank-lg"/>
       
        <Spacer />
        <Button text={t('duihuan')} variant="secondary" />
        <Spacer />
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};
const StyledExchangeImg = styled.div`
  margin-top: -10px;
  margin-bottom: -10px;
`;
export default Specie;
