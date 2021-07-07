//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";
import CardButton from "../CardButton";

export default function WalletModal({}) {
  const { t } = useTranslation();

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
        width="330px"
        showHeader={true}
        title={t('ljqb')}
      >
        <Spacer size="mmd" />
        <CardButton
          className="width-100 wing-blank-lg cursor-pointer"
          size="lg"
        >
          <div className="flex-jc-start width-100">
            <img
              src={require("../../assets/img/metamask.png")}
              width="35"
              height="35"
              className="margin-right-10"
            />
            MetaMask
          </div>
        </CardButton>
      </Modal>
      {/* <Modal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
        width="330px"
        showHeader={true}
        title={t('zhanghu')}
      >
        <div className="bd-bottom">
          <Spacer size="mmd" />
          <div className="flex-jc-center">
            <div className="flex-jc-start ">
              <img
                src={require("../../assets/img/metamask.png")}
                width="25"
                height="25"
                className="margin-right-10"
              />
              MetaMask
            </div>
            <div className="flex-jc-end ">
              <Button
                variant="secondary"
                text={t('genggai')}
                width="60px"
                className="margin-right-10"
              />
              <Button variant="tertiary" text={t('duankai')} width="60px" />
            </div>
          </div>
          <Spacer size="mmd" />
          <div className="flex-jc-start">
            <img
              src={require("../../assets/img/account_icon.png")}
              width="25"
              height="25"
              className="margin-right-10"
            />
            <span>0x1119A6bf…8c8Ea144ef</span>
            <img
              src={require("../../assets/img/copy_icon.png")}
              width="16"
              height="16"
              className="margin-left-10"
            />
          </div>
          <Spacer size="mmd" />
          <div className="flex-jc-start">
            <img
              src={require("../../assets/img/etherscan_icon.png")}
              width="25"
              height="25"
              className="margin-right-10"
            />
            <span className="color-light-blue">{t('zethsck')}</span>
          </div>
          <Spacer size="mmd" />
        </div>
        <div>
          <Spacer size="mmd" />
          <div className="bold-600">{t('wdpxzc')}</div>
          <Spacer size="mmd" />
          <div className="flex-jc-center">
            <div className="flex-jc-start">
              <img
                src={require(`../../assets/img/PETH_icon.png`)}
                width="35"
                height="35"
                className="margin-right-10"
              />
              <div>
                <div>PETH</div>
                <Spacer size="ssm" />
                <div className="flex-jc-start color-grey">
                  <div>0x53f878…055Fbb0</div>
                  <img
                    src={require("../../assets/img/copy_icon.png")}
                    width="16"
                    height="16"
                    className="margin-left-10"
                  />
                </div>
              </div>
            </div>
            20.4756
          </div>
          <Spacer size="mmd" />
          <div className="flex-jc-center">
            <div className="flex-jc-start">
              <img
                src={require(`../../assets/img/PUSDT_icon.png`)}
                width="35"
                height="35"
                className="margin-right-10"
              />
              <div>
                <div>PUSD</div>
                <Spacer size="ssm" />
                <div className="flex-jc-start color-grey">
                  <div>0x53f878…055Fbb0</div>
                  <img
                    src={require("../../assets/img/copy_icon.png")}
                    width="16"
                    height="16"
                    className="margin-left-10"
                  />
                </div>
              </div>
            </div>
            20.4756
          </div>
        </div>
      </Modal> */}
    </>
  );
}
