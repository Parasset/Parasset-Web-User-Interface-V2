//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../Spacer";

import TokenSymbol from "../../TokenSymbol";
import Value from "../../Value";
import Copy from "../../Copy";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
import useParasset from "../../../hooks/useParasset";
import useTotalSupply from "../../../hooks/useTokenTotalSupply";
import useTokenBalance from "../../../hooks/useTokenBalance";
import usePrice from "../../../hooks/coin/usePrice";
const Datum: React.FC = () => {
  const { t } = useTranslation();
  const parasset = useParasset();
  const PUSDToken = parasset?.externalTokens["PUSD"];
  const PETHToken = parasset?.externalTokens["PETH"];
  const PUSDTotalSupply = useTotalSupply(PUSDToken);
  const PETHTotalSupply = useTotalSupply(PETHToken);
  const PETHTokenBalance = useTokenBalance(PETHToken);
  const PUSDTokenBalance = useTokenBalance(PUSDToken);

  const { NESTToUSDTPrice, NESTToETHPrice, ETHToUSDTPrice } = usePrice();
  const PETHAddress = useEncryptAddress(PETHToken?.address);
  const PUSDAddress = useEncryptAddress(PUSDToken?.address);

  return (
    <div className={"wing-blank-lg"}>
      <StyledLabel>{t("wdpxzc")}</StyledLabel>
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
      <Spacer size="mmd" />
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
      <Spacer size="mmd" />
      <div>
        <StyledLabel>{t("jiage")}</StyledLabel>
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <TokenSymbol symbol="ETH" size={25} />
            <TokenSymbol symbol="USDT" size={25} isRight={true} />
          </div>
          <div className="margin-left-10">
            <div className={"bold-600"}>
              <Value value={ETHToUSDTPrice} decimals={8} />
            </div>
            <div className={"color-grey"}>ETH/USDT</div>
          </div>
        </div>
        <Spacer size="mmd" />
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
        <Spacer size="mmd" />
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
        <Spacer size="mmd" />
      </div>

      <div className="">
        <StyledLabel>{t("ltl")}</StyledLabel>
        <a
          href={`https://etherscan.io/token/${PETHToken?.address}`}
          target="_blank"
        >
          <div className="flex-jc-start">
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

        <Spacer size="mmd" />
        <a
          href={`https://etherscan.io/token/${PUSDToken?.address}`}
          target="_blank"
        >
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
    </div>
  );
};
const StyledLabel = styled.div`
  height: 40px;
  display: flex;
  font-weight: 600;
  align-items: center;
`;

export default Datum;
