//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";

export default function RiskModal({}) {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(true);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
        width="20vw"
      >
       
        <div className="text-center">
          <img
            src={require("../../assets/img/icon_warning.png")}
            width="48"
            height="48"
          />
          <Spacer size="ssm" />
          <div>风险提醒</div>
          <Spacer size="mmd" />
          <div className="color-grey text-left">
            铸币存在清算风险，当抵押资产价格大幅下跌，可能会触发清算，另外稳定费会随着时间累加，会增大您的抵押率，引起清算。请实时关注抵押率与清算线。清算后您的抵押资产将无法取回，请仔细阅读并了解铸币规则后在进行操作。
          </div>
          <Spacer size="mmd" />
          <Button variant="secondary" text="我已了解其中风险" />
          <Spacer size="mmd" />
          <a href="" className="color-light-blue">
            了解更多
          </a>
        </div>
      </Modal>
    </>
  );
}
