//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import Container from "../../components/Datum/Container";
import ListItem from "../../components/Datum/ListItem";
import Picker from "../../components/Datum/Picker";
import Value from "../../components/Value";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Container title={`${t("bxc")} TVL`}>
        <Picker>
          <div className="color-main">
            <Value value={234189341209} prefix="$" />
          </div>
        </Picker>
      </Container>

      <Container title={t("ljsxfsr")}>
        <Picker>
          <div className="color-main">
            <Value value={234189341209} prefix="$" />
          </div>
        </Picker>
      </Container>
      <Container title={t("bxcjz")}>
        <Picker>
          <div></div>
        </Picker>
      </Container>
    </>
  );
};

export default Overview;
