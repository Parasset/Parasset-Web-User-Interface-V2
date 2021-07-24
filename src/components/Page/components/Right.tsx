//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
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
const Right: React.FC = () => {
  const { t } = useTranslation();
  const { account, connect } = useWallet();
  const newAccount = useEncryptAddress(account);
  const basisCash = useBasisCash();
  const PUSDTotalSupply = useTotalSupply(basisCash?.externalTokens["PUSD"]);
  const PETHTotalSupply = useTotalSupply(basisCash?.externalTokens["PETH"]);

  const [isOpen, setOpen] = useState(false);
  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();
  useEffect(() => {
    if (!account) {
      connect("injected");
    }
  }, [account]);
  return (
    <StyledNavRight>
      <StyledWallet className="flex-row-center-center bd-bottom wing-blank-lg ">
        <Button
          text={!account ? t("ljqb") : newAccount}
          variant="secondary"
          onClick={() => {
            setOpen(true);
          }}
        />
      </StyledWallet>
      <div className="wing-blank-lg">
        <div className="bd-bottom">
          <StyledLabel>{t("jiage")}</StyledLabel>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="ETH" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={ETHAvgPrice} />
              </div>
              <div>ETH/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="USDT" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={NESTToUSDTPrice} />
              </div>
              <div>NEST/USDT</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="NEST" size={25} />
              <TokenSymbol symbol="ETH" size={25} isRight={true} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={NESTToETHPrice} />
              </div>
              <div>NEST/ETH</div>
            </div>
          </div>
          <Spacer size="md" />
        </div>
        <div className="">
          <StyledLabel>{t("ltl")}</StyledLabel>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="PUSD" size={25} />
            </div>
        
            <div className="margin-left-10">
              <div> <Value value={PUSDTotalSupply} /> </div>
              <div>PUSD</div>
            </div>
          </div>
          <Spacer size="md" />
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="PETH" size={25} />
            </div>
            <div className="margin-left-10">
              <div> <Value value={PETHTotalSupply} /> </div>
              <div>PETH</div>
            </div>
          </div>
        </div>
      </div>
      <WalletModal
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false);
        }}
      />
    </StyledNavRight>
  );
};

const StyledNavRight = styled.div`
  background-color: ${(props) => props.theme.color.grey[100]};
  border-left: 1px solid ${(props) => props.theme.color.grey[200]};
  min-height: 100vh;
  width: 180px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledWallet = styled.div`
  height: 90px;
`;
const StyledLabel = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
`;

export default Right;
