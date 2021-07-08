//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import List from "./components/List";
import useBanks from '../../hooks/useBanks'
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const banks = useBanks()
  console.log("🚀 ~ file: Mine.tsx ~ line 14 ~ banks", banks)
  return (
    <>
      <BigValue text={`${t("kuangchi")} TVL`} color="#77A89A" />

      <List />
    </>
  );
};

export default Mine;
