import React from 'react';
import styled from 'styled-components';
import bacLogo from '../../assets/img/GAC.png';
import ETHLogo from '../../assets/img/ETH.png';
import basLogo from '../../assets/img/GAS.png';
import babLogo from '../../assets/img/GAB.png';
import OXYLogo from '../../assets/img/OXY.png';
import BNBLogo from '../../assets/img/BNB.png';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';

const logosBySymbol: { [title: string]: string } = {
  GAC: bacLogo,
  GAB: babLogo,
  GAS: basLogo,

  DAI: DAILogo,
  SUSD: sUSDLogo,
  USDC: USDCLogo,
  USDT: USDTLogo,
  OXY: OXYLogo,
  BNB: BNBLogo,
  ETH: ETHLogo,
  'GAC_USDT-UNI-LPv2': basLogo,
  'GAS_USDT-UNI-LPv2': basLogo,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
};

const TokenSymbol: React.FC<BasisLogoProps> = ({ symbol, size = 64 }) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <StyledWrap>
      <StyledImg
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={size}
        height={size}
      />
      {symbol === 'GAC_USDT-UNI-LPv2' || symbol === 'GAS_USDT-UNI-LPv2' ? (
        <StyledLPImg src={USDTLogo} alt={`USDT Logo`} width="30" height="30" />
      ) : null}
    </StyledWrap>
  );
};
const StyledWrap = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
`;
const StyledImg = styled.img`
  width: 64px;
  height: 64px;
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const StyledLPImg = styled.img`
  position: absolute;
  right: -15px;
  bottom: 0;
`;

export default TokenSymbol;
