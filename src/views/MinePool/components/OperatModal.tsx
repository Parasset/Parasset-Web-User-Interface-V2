//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import HandlerModal from "../../../components/HandlerModal";
const Mine: React.FC = ({
  isOpen,
  onDismiss,
  mineInfo,
  mine,
  select,
  depositBalance,
  stakeBalance,
  mineId,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <HandlerModal
        title={
          select === 1
            ? ` ${t("diya")} ${mine.depositTokenName} `
            : ` ${t("shuhui")} ${mine.depositTokenName} `
        }
        label={select === 1 ? t("dysl") : t("shsl")}
        balanceTxt={t("keyong")}
        isOpen={isOpen}
        onDismiss={onDismiss}
      />
    </>
  );
};

export default Mine;
