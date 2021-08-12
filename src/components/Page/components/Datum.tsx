//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Toast from "light-toast";
import { useTranslation } from "react-i18next";
import Spacer from "../../Spacer";

import TokenSymbol from "../../TokenSymbol";
import Value from "../../Value";
import Copy from "../../Copy";
import useEncryptAddress from "../../../hooks/useEncryptAddress";
import useBasisCash from "../../../hooks/useBasisCash";
import useTotalSupply from "../../../hooks/useTokenTotalSupply";
import useTokenBalance from "../../../hooks/useTokenBalance";
import usePrice from "../../../hooks/coin/usePrice";
const Datum: React.FC = () => {
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];
  const PUSDTotalSupply = useTotalSupply(PUSDToken);
  const PETHTotalSupply = useTotalSupply(PETHToken);
  const PETHTokenBalance = useTokenBalance(PETHToken);
  const PUSDTokenBalance = useTokenBalance(PUSDToken);

  const { NESTToUSDTPrice, NESTToETHPrice, ETHAvgPrice } = usePrice();
  const PETHAddress = useEncryptAddress(PETHToken?.address);
  const PUSDAddress = useEncryptAddress(PUSDToken?.address);

  return (
    <div>
      {/* <StyledLabel>{t("wdpxzc")}</StyledLabel>
      <div className="flex-jc-center">
        <div className="flex-jc-start">
          <TokenSymbol symbol="PETH" size={25} />
          <div className="margin-left-10">
            <div>PETH</div>
            <Spacer size="ssm" />
            <div className="flex-jc-start color-grey">
              <div>{PETHAddress}</div>
              <Copy toCopy={PETHToken?.address} />
            </div>
            <div>
              <Value value={PETHTokenBalance} />
            </div>
          </div>
        </div>
      </div>
      <Spacer size="mmd" />
      <div className="flex-jc-center">
        <div className="flex-jc-start">
          <TokenSymbol symbol="PUSD" size={25} />
          <div className="margin-left-10">
            <div>PUSD</div>
            <Spacer size="ssm" />
            <div className="flex-jc-start color-grey">
              <div>{PUSDAddress}</div>
              <Copy toCopy={PUSDToken?.address} />
            </div>
            <div>
              {" "}
              <Value value={PUSDTokenBalance} />
            </div>
          </div>
        </div>
      </div>
      <Spacer size="mmd" /> */}
      <div>
        <StyledLabel>{t("jiage")}</StyledLabel>
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <TokenSymbol symbol="ETH" size={25} />
            <TokenSymbol symbol="USDT" size={25} isRight={true} />
          </div>
          <div className="margin-left-10">
            <div>
              <Value value={ETHAvgPrice} decimals={8}/>
            </div>
            <div>ETH/USDT</div>
          </div>
        </div>
        <Spacer size="mmd" />
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <TokenSymbol symbol="NEST" size={25} />
            <TokenSymbol symbol="USDT" size={25} isRight={true} />
          </div>
          <div className="margin-left-10">
            <div>
              <Value value={NESTToUSDTPrice} decimals={8}/>
            </div>
            <div>NEST/USDT</div>
          </div>
        </div>
        <Spacer size="mmd" />
        <div className="flex-jc-start">
          <div className="flex-jc-center">
            <TokenSymbol symbol="NEST" size={25} />
            <TokenSymbol symbol="ETH" size={25} isRight={true} />
          </div>
          <div className="margin-left-10">
            <div>
              <Value value={NESTToETHPrice}  decimals={8}/>
            </div>
            <div>NEST/ETH</div>
          </div>
        </div>
        <Spacer size="mmd" />
      </div>

      <div className="">
        <StyledLabel>{t("ltl")}</StyledLabel>
        <a href={`https://etherscan.io/token/${PETHToken?.address}`}>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="PUSD" size={25} />
            </div>

            <div className="margin-left-10">
              <div>
                <Value value={PUSDTotalSupply} />{" "}
              </div>
              <div>PUSD</div>
            </div>
          </div>
        </a>

        <Spacer size="mmd" />
        <a href={`https://etherscan.io/token/${PUSDToken?.address}`}>
          <div className="flex-jc-start">
            <div className="flex-jc-center">
              <TokenSymbol symbol="PETH" size={25} />
            </div>
            <div className="margin-left-10">
              <div>
                <Value value={PETHTotalSupply} />{" "}
              </div>
              <div>PETH</div>
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
  align-items: center;
`;

export default Datum;
