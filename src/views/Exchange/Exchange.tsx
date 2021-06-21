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
  return (
    <div className="wing-blank-xl">
      <Specie />
      <BtnLink text="为保险池提供流动性" />
    </div>
  );
};

export default Coin;
