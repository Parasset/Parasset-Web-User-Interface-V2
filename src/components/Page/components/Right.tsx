//@ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Toast from "light-toast";
import { useWallet } from "use-wallet";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import Spacer from "../../Spacer";
import WalletModal from "../../WalletModal";
import TokenSymbol from "../../TokenSymbol";
import Value from "../../Value";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
import useBasisCash from "../../../hooks/useBasisCash";
import useTotalSupply from "../../../hooks/useTokenTotalSupply";
import usePrice from "../../../hooks/coin/usePrice";
import Copy from "../../Copy";
import useTokenBalance from "../../../hooks/useTokenBalance";
const Right: React.FC = ({ isDatumPath }) => {
  const { t } = useTranslation();
  const { account, connect, status } = useWallet();
  const newAccount = useEncryptAddress(account);
  const basisCash = useBasisCash();
  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];
  const PETHTotalSupply = useTotalSupply(PETHToken);
  const PETHTokenBalance = useTokenBalance(PETHToken);
  const PUSDTokenBalance = useTokenBalance(PUSDToken);

  const PETHAddress = useEncryptAddress(PETHToken?.address);
  const PUSDAddress = useEncryptAddress(PUSDToken?.address);
  const PUSDTotalSupply = useTotalSupply(PUSDToken);

  const [isOpen, setOpen] = useState(false);
  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();
  useEffect(() => {
    if (status === "disconnected") {
      connect("injected");
    } else if (status === "error") {
      Toast.info(t("zwwlcw"));
    }
  }, [status]);

  return (
    <StyledNavRight style={{ display: isDatumPath ? "none" : "block" }}>
      <StyledWallet className="flex-row-center-center bd-bottom wing-blank-lg ">
        <Button
          text={!account ? t("ljqb") : newAccount}
          variant="secondary"
          onClick={() => {
            setOpen(true);
          }}
        />
      </StyledWallet>
      <WrappedNavRight>
        <div className="wing-blank-lg bd-bottom">
          <StyledLabel>{t("wdpxzc")}</StyledLabel>
          <Spacer size="sm" />
          <div className="flex-al-start">
            <TokenSymbol symbol="PETH" size={25} />
            <div className="margin-left-10">
              <div className={"bold-600"}>PETH</div>
              <Spacer size="ssm" />
              <div className="flex-jc-start color-grey">
                <div>{PETHAddress}</div>
                <Copy toCopy={PETHToken?.address} />
              </div>
              <div className={"bold-600"}>
                <Value value={PETHTokenBalance} />
              </div>
            </div>
          </div>
          <Spacer size="sm" />
          <div className="flex-al-start">
            <TokenSymbol symbol="PUSD" size={25} />
            <div className="margin-left-10">
              <div className={"bold-600"}>PUSD</div>
              <Spacer size="ssm" />
              <div className="flex-jc-start color-grey">
                <div>{PUSDAddress}</div>
                <Copy toCopy={PUSDToken?.address} />
              </div>
              <div className={"bold-600"}>
                <Value value={PUSDTokenBalance} />
              </div>
            </div>
          </div>
          <Spacer size={"mmd"} />
        </div>
        <div className="wing-blank-lg bd-bottom">
          <StyledLabel>{t("jiage")}</StyledLabel>
          <Spacer size="sm" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="ETH" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div className={"bold-600"}>
                <Value value={ETHAvgPrice} decimals={8} />
              </div>
              <div className={"color-grey"}>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="sm" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div className={"bold-600"}>
                <Value value={NESTToUSDTPrice} decimals={8} />
              </div>
              <div className={"color-grey"}>NEST/USDT</div>
            </div>
          </div>
          <Spacer size="sm" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="ETH" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div className={"bold-600"}>
                <Value value={NESTToETHPrice} decimals={8} />
              </div>
              <div className={"color-grey"}>NEST/ETH</div>
            </div>
          </div>
          <Spacer size="md" />
        </div>
        <div className="wing-blank-lg">
          <StyledLabel>{t("ltl")}</StyledLabel>
          <Spacer size="sm" />
          <a href={`https://etherscan.io/token/${PUSDToken?.address}`} target="_blank" >
            <div className="flex-jc-start ">
              <div className="flex-jc-center">
                <TokenSymbol symbol="PUSD" size={25} />
              </div>
              <div className="margin-left-10">
                <div className={"bold-600"}>
                  <Value value={PUSDTotalSupply} />{" "}
                </div>
                <div className={"color-grey"}>PUSD</div>
              </div>
            </div>
          </a>

          <Spacer size="sm" />
          <a href={`https://etherscan.io/token/${PETHToken?.address}`} target="_blank" >
            <div className="flex-jc-start">
              <div className="flex-jc-center">
                <TokenSymbol symbol="PETH" size={25} />
              </div>
              <div className="margin-left-10">
                <div className={"bold-600"}>
                  <Value value={PETHTotalSupply} />{" "}
                </div>
                <div className={"color-grey"}>PETH</div>
              </div>
            </div>
          </a>
        </div>
      </WrappedNavRight>
      <WalletModal
        isOpen={isOpen}
        key={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </StyledNavRight>
  );
};

const WrappedNavRight = styled.div`
  background-color: rgba(255,255,255, 0.7);
  height: 100vh;
`

const StyledNavRight = styled.div`
  border-left: 1px solid ${(props) => props.theme.color.black};
  min-height: 100vh;
  width: 240px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10000;
  @media (max-width: 768px) {
    display: none!important;
  }
`;

const StyledWallet = styled.div`
  height: 90px;
`;
const StyledLabel = styled.div`
  height: 45px;
  display: flex;
  font-weight: 600;
  align-items: center;
`;

export default Right;
