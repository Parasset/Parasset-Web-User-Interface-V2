//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import TokenSymbol from "../../../components/TokenSymbol";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";
import useHarvest from "../../../hooks/useHarvest";
const Harvest: React.FC = ({ mine, mineInfo }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { onReward } = useHarvest(mine?.depositToken?.address);
  const [pendingTx, setPendingTx] = useState(false);

  const onConfirm = useCallback(async () => {
    setPendingTx(true);
    const result = await onReward();
    setPendingTx(false);
  }, [onReward]);
  return (
    <>
      <StyledWrapBox className={`wing-blank-lg ${isMobile ? "" : "width-47"} `}>
        <Spacer size="mmd" />
        <div className="color-grey">{t("wdsy")}</div>
        <Spacer />
        <div className="wing-blank-llg  text-center">
          <TokenSymbol symbol={mine.earnTokenName} size={40} />
          <Spacer size="sm" />
          <div className="font-size-24 bold-600">
            {" "}
            <Value value={mineInfo.earned} />
          </div>
          <Spacer size="sm" />
          <div className="color-grey">
            {t("dlqsy")} ( {mine.earnTokenName} )
          </div>
          <Spacer />
          <Button
            text={t("lqsy")}
            variant="secondary"
            disabled={pendingTx || !parseFloat(mineInfo.earned)}
            onClick={onConfirm}
          />
        </div>

        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};

const StyledWrapBox = styled(Card)`
  height: 260px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export default Harvest;
