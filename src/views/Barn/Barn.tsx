
//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import Back from "../../components/Back";
import Info from "./components/Info";
import Handler from "./components/Handler";


const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Back text={`USDT-PUSD LP ${t('kuangchi')}`} img="USDT" img1="PUSD" />
      <Info />
      <Handler />
     
    </>
  );
};

export default Mine;
