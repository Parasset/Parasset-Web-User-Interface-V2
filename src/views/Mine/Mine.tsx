//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import Value from "../../components/Value";
import List from "./components/List";
import useMines from "../../hooks/useMines";
const Mine: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const mines = useMines();
  return (
    <>
      <BigValue
        text={`${t("kuangchi")} TVL`}
        color="#77A89A"
        value={<Value value={0} />}
      />

      <List mines={mines} />
    </>
  );
};

export default Mine;
