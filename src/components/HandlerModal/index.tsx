//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import CardButton from "../CardButton";
import Label from "../Label";
import Button from "../Button";
import Input from "../Input";

export default function HandlerModal({
  isOpen,
  onDismiss,
  onConfirm,
  title,
  label,
  balanceTxt,
  columns,
  disabled
}) {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        showHeader={true}
        title={title}
      >
        <Spacer size="mmd" />
        <div className="flex-jc-center">
          <div className="color-grey">{label}</div>
          <div>
            <span className="color-grey"> {balanceTxt}：</span>
            <span className="text-underline ">23.3333</span>
          </div>
        </div>
        <Spacer size="mmd" />
        <CardButton
          className="width-100 wing-blank-lg cursor-pointer"
          size="lg"
        >
          <div className="flex-jc-center">
            <div className="flex-jc-start font-size-12">
              <div className="flex-jc-start margin-right-10">
                <img
                  src={require(`../../assets/img/USDT.png`)}
                  width="25"
                  height="25"
                />
                <img
                  src={require(`../../assets/img/PUSD.png`)}
                  width="25"
                  height="25"
                  className="margin-left-minus-10"
                />
              </div>
              <span>LP-USD</span>
            </div>
            <Input />
          </div>
        </CardButton>
        {columns &&
          Object.keys(columns).map((key) => {
            const item = columns[key];
            return (
              <React.Fragment key={key}>
                <Spacer size="mmd" />
                <Label
                  label={item?.label}
                  value={`${item?.value} ${item?.unit}`}
                />
              </React.Fragment>
            );
          })}

        <Spacer size="mmd" />
        <Button variant="secondary" text={t("queren")} disabled={disabled} onClick={onConfirm}/>
      </Modal>
    </>
  );
}
