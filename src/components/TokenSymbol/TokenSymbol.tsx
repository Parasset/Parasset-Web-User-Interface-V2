import React from "react";
import styled from "styled-components";
import PETH from "../../assets/svg/PETH.svg";
import ASET from "../../assets/img/ASET.png";
import NEST from "../../assets/svg/NEST.svg";
import ETH from "../../assets/img/ETH.png";
import USDT from "../../assets/svg/USDT.svg";
import PUSD from "../../assets/svg/PUSD.svg";
import HBTC from "../../assets/svg/HBTC.svg";
import PBTC from "../../assets/svg/PBTC.svg";

const logosBySymbol: { [title: string]: string } = {
  PETH,
  ASET,
  NEST,
  ETH,
  USDT,
  PUSD,
  HBTC,
  PBTC,
};

type BasisLogoProps = {
  symbol: string;
  size?: number;
  className?: string;
  isRight?: boolean;
};

const TokenSymbol: React.FC<BasisLogoProps> = ({
  symbol,
  className,
  size = 35,
  isRight = false,
}) => {
  if (!logosBySymbol[symbol]) {
    throw new Error(`Invalid BasisLogo symbol: ${symbol}`);
  }
  return (
    <StyledImg
      className={`${className} ${isRight ? "margin-left-minus-10" : ""}`}
      src={logosBySymbol[symbol]}
      alt={`${symbol} Logo`}
      width={size}
      height={size}
    />
  );
};

const StyledImg = styled.img``;

export default TokenSymbol;
