//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "./../../utils/utils";

import BigValue from "../../components/BigValue";
import TableTitle from "./components/TableTitle";
import TableList from "./components/TableList";
import Value from "../../components/Value";

import Footer from "./components/Footer";
import useBasisCash from "./../../hooks/useBasisCash";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useMaxRatio from "./../../hooks/coin/useMaxRatio";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
import useItanks from "./../../hooks/itank/useItanks";
import useItankInfo from "./../../hooks/itank/useItankInfo";
const Home: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const itanks = useItanks();
  //两个保险池相加
  const { itankInfo: itankInfo1 } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: itankInfo2 } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
  const ETHDebt = useDebt("ETHPUSD");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const { info: ETHDebtInfo } = useDebtInfo(ETHDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);
  const { info: NESTPETHDebtfo } = useDebtInfo(NESTPETHDebt);
  const ETHPUSDTVL = useTVL(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken,
    ETHDebtInfo?.mortgagePrice
  );

  const NESTPUSDTVL = useTVL(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken,
    NESTPUSDDebtInfo?.mortgagePrice
  );
  const NESTPETHTVL = useTVL(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken,
    NESTPETHDebtfo?.mortgagePrice
  );
  const maxRatioETH = useMaxRatio(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken
  );
  const maxRatioNEST = useMaxRatio(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );

  const PUSDTotalSupply = useTotalSupply(basisCash?.externalTokens["PUSD"]);
  const PETHTotalSupply = useTotalSupply(basisCash?.externalTokens["PETH"]);

  const ETHTVL = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDTVL));
  }, [ETHPUSDTVL]);
  const NESTTVL = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(NESTPUSDTVL).plus(NESTPETHTVL).toNumber())
    );
  }, [NESTPUSDTVL, NESTPETHTVL]);

  const list = useMemo(() => {
    return [
      {
        name: "ETH",
        TVL: ETHTVL,
        maxRatio: $isPositiveNumber(
          $isFiniteNumber(new BigNumber(maxRatioETH).times(100).toNumber())
        ),

        liqRatio: $isPositiveNumber(
          $isFiniteNumber(
            new BigNumber(ETHDebtInfo.liqRatio).times(100).toNumber()
          )
        ),
        balance: "",
        active: "PUSD",
        selectList: [
          {
            name: "PUSD",
            id: "PUSD",
          },
        ],
      },
      {
        name: "NEST",
        TVL: NESTTVL,
        maxRatio: $isPositiveNumber(
          $isFiniteNumber(new BigNumber(maxRatioNEST).times(100).toNumber())
        ),
        liqRatio: $isPositiveNumber(
          $isFiniteNumber(
            new BigNumber(NESTPUSDDebtInfo.liqRatio).times(100).toNumber()
          )
        ),
        balance: "",
        active: "PUSD",
        selectList: [
          {
            name: "PUSD",
            id: "PUSD",
          },
          {
            name: "PETH",
            id: "PETH",
          },
        ],
      },
    ];
  }, [
    ETHTVL,
    NESTTVL,
    maxRatioETH,
    maxRatioNEST,
    ETHDebtInfo,
    NESTPUSDDebtInfo,
    ,
  ]);
  const totalmortgageAssetValue = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(ETHTVL).plus(NESTTVL).toNumber())
    );
  }, [ETHTVL, NESTTVL]);

  const totalParassetValue = useMemo(() => {
    //两个平行资产总供应*对U价值
    const PUSDValue = new BigNumber(PUSDTotalSupply).times(1);

    const PETHValue = new BigNumber(PETHTotalSupply).times(
      ETHDebtInfo?.mortgagePrice
    );
    return $isPositiveNumber(
      $isFiniteNumber(PUSDValue.plus(PETHValue).toNumber())
    );
  }, [PUSDTotalSupply, PETHTotalSupply, ETHDebtInfo?.mortgagePrice]);

  const totalItankValue = useMemo(() => {
    //保险池内资产两种币的总和换成USDT
    let tvl1 = new BigNumber(itankInfo1.depositFundValue).plus(
      itankInfo1.earnFundValue
    );
    let tvl2 = new BigNumber(itankInfo2.depositFundValue).plus(
      itankInfo2.earnFundValue
    );
    tvl1 = $isPositiveNumber($isFiniteNumber(tvl1.toNumber()));
    tvl2 = $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(tvl1).plus(tvl2).toNumber())
    );
  }, [
    itankInfo1.depositFundValue,
    itankInfo1.earnFundValue,
    itankInfo2.depositFundValue,
    itankInfo2.earnFundValue,
  ]);

  return (
    <>
      <BigValue
        text={t("dyzcsdsz")}
        color="#DD8751"
        value={<Value value={totalmortgageAssetValue} prefix="$" />}
      />
      <BigValue
        text={t("pxzcltsz")}
        color="#77A89A"
        value={<Value value={totalParassetValue} prefix="$" />}
      />
      <BigValue
        text={t("bxcldxzsz")}
        color="#5DB3D3"
        value={<Value value={totalItankValue} prefix="$" />}
      />
      <TableTitle />
      <TableList list={list} />
      <Footer />
    </>
  );
};

export default Home;
