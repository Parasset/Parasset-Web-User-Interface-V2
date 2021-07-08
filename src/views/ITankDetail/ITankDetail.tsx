//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";
import Back from "../../components/Back";
import MyInfo from "./components/MyInfo";
import FundInfo from "./components/FundInfo";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation()
  return (
    <>
      <Back text={`USDT-PUSD  ${t('bxc')}`} img="USDT_icon" img1="PUSDT_icon" />
      <div className="wing-blank-xl">
        <MyInfo />
        <FundInfo />
      </div>
    </>
  );
};

export default Mine;
