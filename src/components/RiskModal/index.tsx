//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";

export default function RiskModal({ isOpen, onDismiss, messages }) {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <div className="text-center wing-blank">
          <img
            alt="image"
            src={require("../../assets/svg/icon_warning.svg")}
            width="48"
            height="48"
          />
          <Spacer size="ssm" />
          <div>{t("fxtx")}</div>
          <Spacer size="mmd" />
          {messages.map((item) => {
            return (
              <div className="color-grey text-left" key={item}>
                {t(item)}
                <Spacer size="mmd" />
              </div>
            );
          })}

          <Spacer size="mmd" />
          <Button
            variant="secondary"
            text={t("wyljqzfx")}
            onClick={onDismiss}
          />
          <Spacer size="mmd" />
          <a
            href={"https://www.parasset.top/file/Parasset_WhitePaper.pdf"}
            className="color-light-blue"
            target="_blank"
          >
            {t("ljgd")}
          </a>
        </div>
      </Modal>
    </>
  );
}
