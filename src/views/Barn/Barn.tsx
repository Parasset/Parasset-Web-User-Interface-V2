
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

  return (
    <>
      <Back text="USDT-PUSD LP 矿池" img="USDT_icon" img1="PUSDT_icon" />
      <Info />
      <Handler />
     
    </>
  );
};

export default Mine;
