//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import Back from "../../components/Back";
import Info from "./components/Info";
import Harvest from "./components/Harvest";
import Stake from "./components/Stake";
import BtnLink from "../../components/BtnLink";
import Spacer from "../../components/Spacer";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <Back text={`USDT-PUSD LP ${t("kuangchi")} `} img="USDT_icon" img1="PUSDT_icon" />
      <Info />
      <div className={` ${isMobile ? "" : "flex-jc-center width-100"} `}>
        <Harvest />
        {isMobile ? <Spacer size="mmd" /> : null}
        <Stake />
      </div>
      <BtnLink text={` ${t("hq")} LP-USD`} />
    </>
  );
};

export default Mine;
