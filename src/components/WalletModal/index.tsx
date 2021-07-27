//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import Spacer from "../Spacer";
import CardButton from "../CardButton";
import TokenSymbol from "../TokenSymbol";
import Copy from "../Copy";
import config from "../../config";
import useBasisCash from "./../../hooks/useBasisCash";
import useTokenBalance from "./../../hooks/useTokenBalance";
import useEncryptAddress from "./../../hooks/useEncryptAddress";
export default function WalletModal({ isOpen, onDismiss }) {
  const { t } = useTranslation();
  const { account, connect, connector } = useWallet();
  const basisCash = useBasisCash();
  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];

  const PETHTokenBalance = useTokenBalance(PETHToken);
  const PUSDTokenBalance = useTokenBalance(PUSDToken);
  const PETHAddress = useEncryptAddress(PETHToken?.address);
  const PUSDAddress = useEncryptAddress(PUSDToken?.address);
  const newAccount = useEncryptAddress(account);
  return (
    <>
      <Modal
        isOpen={isOpen}
        onDismiss={onDismiss}
        width="330px"
        showHeader={true}
        title={!account ? t("ljqb") : t("zhanghu")}
      >
        {!account ? (
          <>
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("injected");
                onDismiss();
              }}
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
            <Spacer size="mmd" />
            <CardButton
              className="width-100 wing-blank-lg cursor-pointer"
              size="lg"
              onClick={() => {
                connect("walletconnect");
                onDismiss();
              }}
            >
              <div className="flex-jc-start width-100">
                <img
                  src={require("../../assets/img/walletconnect.png")}
                  width="35"
                  height="35"
                  className="margin-right-10"
                />
                WalletConnect
              </div>
            </CardButton>
          </>
        ) : (
          <>
            <div className="bd-bottom">
              <Spacer size="mmd" />
              <div className="flex-jc-center">
                <div className="flex-jc-start ">
                  {/* injected  */}
                  <img
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
                {/* <div className="flex-jc-end ">
                  <Button
                    variant="secondary"
                    text={t("genggai")}
                    width="60px"
                    className="margin-right-10"
                  />
                  <Button variant="tertiary" text={t("duankai")} width="60px" />
                </div> */}
              </div>
              <Spacer size="mmd" />
              <div className="flex-jc-start">
                <img
                  src={require("../../assets/img/account_icon.png")}
                  width="25"
                  height="25"
                  className="margin-right-10"
                />

                <span>{newAccount}</span>

                <Copy toCopy={account} />
              </div>
              <Spacer size="mmd" />
              <div className="flex-jc-start">
                <img
                  src={require("../../assets/img/etherscan_icon.png")}
                  width="25"
                  height="25"
                  className="margin-right-10"
                />
                <a
                  className="color-light-blue"
                  href={`${config.etherscanUrl}address/${account}`}
                  target="__blank"
                >
                  {t("zethsck")}
                </a>
              </div>
              <Spacer size="mmd" />
            </div>
            <div>
              <Spacer size="mmd" />
              <div className="bold-600">{t("wdpxzc")}</div>
              <Spacer size="mmd" />
              <div className="flex-jc-center">
                <div className="flex-jc-start">
                  <TokenSymbol symbol="PETH" size={35} />
                  <div className="margin-left-10">
                    <div>PETH</div>
                    <Spacer size="ssm" />
                    <div className="flex-jc-start color-grey">
                      <div>{PETHAddress}</div>

                      <Copy toCopy={PETHToken?.address} />
                    </div>
                  </div>
                </div>

                {PETHTokenBalance}
              </div>
              <Spacer size="mmd" />
              <div className="flex-jc-center">
                <div className="flex-jc-start">
                  <TokenSymbol symbol="PUSD" size={35} />
                  <div className="margin-left-10">
                    <div>PUSD</div>
                    <Spacer size="ssm" />
                    <div className="flex-jc-start color-grey">
                      <div>{PUSDAddress}</div>

                      <Copy toCopy={PUSDToken?.address} />
                    </div>
                  </div>
                </div>
                {PUSDTokenBalance}
              </div>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
