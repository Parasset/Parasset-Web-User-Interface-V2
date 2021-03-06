//@ts-nocheck
import React from "react";

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
    require(`../../assets/img/loading.gif`),
    require(`../../assets/img/pending.gif`),
    require(`../../assets/svg/icon_success.svg`),
    require(`../../assets/svg/icon_fail.svg`),
    require(`../../assets/svg/icon_warning.svg`),
  ];
  return (
    <>
      <Modal isOpen={isOpen} onDismiss={onDismiss} width="300px">
        <StyledModalHeader className="flex-jc-center wing-blank">
          <CloseIcon
            src={require("../../assets/svg/icon_close.svg")}
            width="15"
            height="15"
            onClick={() => {
              onDismiss(false);
            }}
          />
        </StyledModalHeader>

        <div className="text-center">
          <img alt="image" src={imgList[status - 1]} width="48" height="48" />
          <Spacer size="ssm" />
          <div>{t(textList[status - 1])}</div>
        </div>
        <Spacer size="mmd" />
        {status === 3 ? (
          <Button
            variant="tertiary"
            text={t("ckjy")}
            width="160px"
            href={`${config.etherscanUrl}/tx/${tx}`}
            className="center-block"
            target="_self"
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
