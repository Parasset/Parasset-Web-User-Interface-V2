//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";

export default function StatusModal({}) {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
        width="300px"
      >
        <StyledModalHeader className="flex-jc-center">
          <CloseIcon
            src={require("../../assets/img/icon_close.png")}
            width="15"
            height="15"
            onClick={() => {
              setOpen(false);
            }}
          />
        </StyledModalHeader>

        <div className="text-center">
          <img
            src={require("../../assets/img/icon_warning.png")}
            width="48"
            height="48"
          />
          <Spacer size="ssm" />
          <div>交易取消</div>
        </div>
        <Spacer size="mmd" />
        <Button variant="tertiary" text="查看交易" width="100px" className="center-block"/>
      </Modal>
    </>
  );
}

const StyledModalHeader = styled.div`
  height: 40px;
  margin-top:-20px;
  justify-content: flex-end !important;
`;

const CloseIcon = styled.img`
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;
