//@ts-nocheck
import React, { useState } from "react";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import Button from "../Button";
import CardButton from "../CardButton";
import Copy from "../Copy";
import config from "../../config";
import useEncryptAddress from "./../../hooks/useEncryptAddress";
export default function WalletModal({ isOpen, onDismiss }) {
  const { t } = useTranslation();
  const { account, connect, connector, status, reset } = useWallet();
  const [backWallet, setBackWallet] = useState(false);
  const newAccount = useEncryptAddress(account);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        width="330px"
        showHeader={true}
        title={status !== "connected" || backWallet ? t("ljqb") : t("zhanghu")}
      >
        {status !== "connected" || backWallet ? (
          <div className={"wing-blank"}>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("injected");
                onDismiss();
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  alt="image"
                  src={require("../../assets/img/metamask.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                MetaMask
              </div>
            </CardButton>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("walletconnect");
                onDismiss();
              }}
            >
              <div className="flex-jc-start width-100  bold-600 font-size-16">
                <img
                  alt="image"
                  src={require("../../assets/img/walletconnect.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                WalletConnect
              </div>
            </CardButton>
          </div>
        ) : (
          <div className={"wing-blank"}>
            <Spacer size="mmd" />
            <div className="flex-jc-center">
              <div className="flex-jc-start  bold-600 font-size-16">
                {/* injected  */}
                <img
                  alt="image"
                  src={
                    connector === "injected"
                      ? require("../../assets/img/metamask.png")
                      : require("../../assets/img/walletconnect.png")
                  }
                  width="25"
                  height="25"
                  className="margin-right-10"
                />
                {connector === "injected" ? "MetaMask" : "WalletConnect"}
              </div>
              <div className="flex-jc-end ">
                <Button
                  variant="secondary"
                  text={t("genggai")}
                  size={"sm"}
                  onClick={() => {
                    setBackWallet(true);
                  }}
                />
              </div>
            </div>
            <Spacer size="mmd" />
            <div className="flex-jc-start">
              <img
                alt="image"
                src={require("../../assets/img/account_icon.png")}
                width="25"
                height="25"
                className="margin-right-10"
              />

              <span className=" bold-600 font-size-16">{newAccount}</span>

              <Copy toCopy={account} />
            </div>
            <Spacer size="mmd" />
            <div className="flex-jc-start">
              <img
                alt="image"
                src={require("../../assets/img/etherscan_icon.png")}
                width="25"
                height="25"
                className="margin-right-10"
              />
              <a
                className="color-light-blue"
                href={`${config.etherscanUrl}address/${account}`}
              >
                {t("zethsck")}
              </a>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
