//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import CardButton from "../CardButton";
import Label from "../Label";
import Button from "../Button";

export default function HandlerModal({}) {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
        width="28vw"
        showHeader={true}
        title="赎回 LP-USD"
      >
        <Spacer size="mmd" />
        <div className="flex-jc-center">
          <div className="color-grey">赎回数量</div>
          <div>
            <span className="color-grey"> 可赎回：</span>23.3333
          </div>
        </div>
        <Spacer size="mmd" />
        <CardButton
          className="width-100 wing-blank-lg cursor-pointer"
          size="lg"
        >
          <div className="flex-jc-center">
            <div className="flex-jc-start">
              <div className="flex-jc-start margin-right-10">
                <img
                  src={require(`../../assets/img/USDT_icon.png`)}
                  width="35"
                  height="35"
                />
                <img
                  src={require(`../../assets/img/PUSDT_icon.png`)}
                  width="35"
                  height="35"
                  className="margin-left-minus-10"
                />
              </div>
              LP-USD
            </div>
            <StyledInput  />
          </div>
        </CardButton>
        <Spacer size="mmd" />
        <Label label="抵押资产变更为" value="345,240 NEST" />
        <Spacer size="mmd" />
        <Label label="抵押率变更为" value="64%" />
        <Spacer size="mmd" />
        <Label label="清算价变更为" value="1345 PUSD" />
        <Spacer size="mmd" />
        <Label label="缴纳稳定费" value="4.41 PUSD" />
        <Spacer size="mmd" />
        <Button variant="secondary" text="确认" />
      </Modal>
    </>
  );
}
const StyledInput = styled.input`
  outline: none;
  border: none;
  background-color: transparent;
  text-align: right;
`;
