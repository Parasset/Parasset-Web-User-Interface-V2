//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import List from "./components/List";
import StatusModal from "../../components/StatusModal";
import RiskModal from "../../components/RiskModal";
import WalletModal from "../../components/WalletModal";
import HandlerModal from "../../components/HandlerModal";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <BigValue text="保险池 TVL" />

      <List />
      {/* <StatusModal /> */}
      {/* <RiskModal /> */}
      <WalletModal />
      {/* <HandlerModal /> */}
    </>
  );
};

export default Mine;
