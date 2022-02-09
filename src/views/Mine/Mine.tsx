//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import Value from "../../components/Value";
import List from "./components/List";
import useMines from "../../hooks/mine/useMines";
import useMineTotalTvl from "../../hooks/mine/useMineTotalTvl";
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const mines = useMines();
  const {totalTvl} = useMineTotalTvl(mines);

  
  return (
    <>
      <BigValue
        text={`${t("kuangchi")} TVL`}
        color="#000"
        value={<Value value={totalTvl} prefix="$" />}
      />

      <List mines={mines} />
    </>
  );
};

export default Mine;
