//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";
import {
  useWaitModal,
  useStatusModalToggle,
  useStatus,
  useTransactionHash,
} from "../../state/application/hooks";
import config from "../../config";
export default function StatusModal({}) {
  const { t } = useTranslation();
  const isOpen = useWaitModal();
  const onDismiss = useStatusModalToggle();
  const status = useStatus();
  const tx = useTransactionHash();

  const textList = ["qrz", "jygbz", "jycg", "jysb", "jyqx"];
  const imgList = [
    "icon_loading",
    "icon_broadcast",
    "icon_success",
    "icon_fail",
    "icon_warning",
  ];
  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        width="300px"
      >
        <StyledModalHeader className="flex-jc-center">
          <CloseIcon
            src={require("../../assets/img/icon_close.png")}
            width="15"
            height="15"
            onClick={() => {
              onDismiss(false);
            }}
          />
        </StyledModalHeader>

        <div className="text-center">
          <img
            src={require(`../../assets/img/${imgList[status - 1]}.png`)}
            width="48"
            height="48"
          />
          <Spacer size="ssm" />
          <div>{t(textList[status - 1])}</div>
        </div>
        <Spacer size="mmd" />
        {status === 3 ? (
          <Button
            variant="tertiary"
            text={t("ckjy")}
            width="100px"
            href={`${config.etherscanUrl}/tx/${tx}`}
            className="center-block"
          />
        ) : null}
      </Modal>
    </>
  );
}

const StyledModalHeader = styled.div`
  height: 40px;
  margin-top: -20px;
  justify-content: flex-end !important;
`;

const CloseIcon = styled.img`
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
