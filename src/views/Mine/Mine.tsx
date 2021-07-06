//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

import BigValue from "../../components/BigValue";
import List from "./components/List";

const Mine: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <>
      <BigValue text="矿池 TVL" color="#77A89A" />

      <List />
    </>
  );
};

export default Mine;
