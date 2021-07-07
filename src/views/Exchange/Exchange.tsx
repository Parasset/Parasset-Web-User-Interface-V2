//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";
import Tab from "../../components/Tab";
import Specie from "./components/Specie";
import BtnLink from "../../components/BtnLink";
const Coin: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <div className="wing-blank-xl">
      <Specie />
      <BtnLink text= {t('wbxctgldx')} />
    </div>
  );
};

export default Coin;
