//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import BigValue from "../../../components/BigValue";
import Depot from "./Depot";
const Specie: React.FC = ({  }) => {
  const { t } = useTranslation();
  return (
    <>
      <Spacer size="sm" />
      <Spacer size="sm" />
 
    
      <BigValue text={t('dasz')} color="#DD8751" />
      <BigValue text={t('zwsz')} color="#77A89A" />
      <Spacer size="sm" />
      <Depot/>
    </>
  );
};

export default Specie;
