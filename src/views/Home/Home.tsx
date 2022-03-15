//@ts-nocheck
import React, { useMemo } from "react";
import BigNumber from "bignumber.js";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import BigValue from "../../components/BigValue";
import TableTitle from "../../components/TableTitle";
import TableList from "./components/TableList";
import Value from "../../components/Value";

import Footer from "./components/Footer";
import useParasset from "./../../hooks/useParasset";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useStaked from "../../hooks/debt/useStaked";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useMaxRatio from "./../../hooks/coin/useMaxRatio";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
import useItanks from "./../../hooks/itank/useItanks";
import useItankInfo from "./../../hooks/itank/useItankInfo";
const Home: React.FC = () => {
  const parasset = useParasset();
  const itanks = useItanks();
  const titles = [
    {
      text: "Assets",
      className: "flex1",
    },

    {
      text: "TVL",
      className: "flex1",
    },

    {
      text: "Staked",
      className: "flex1",
    },

    {
      text: "Max Coll. Ratio",
      className: "flex1",
    },

    {
      text: "Liquidation Ratio",
      className: "flex1",
    },
  ];
  //两个保险池相加
  const { itankInfo: itankInfo1 } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: itankInfo2 } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
  const ETHPUSDDebt = useDebt("ETHPUSD");
  const ETHPBTCDebt = useDebt("ETHPBTC");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const NESTPBTCDebt = useDebt("NESTPBTC");

  const { info: ETHPUSDDebtInfo } = useDebtInfo(ETHPUSDDebt);
  const { info: ETHPBTCDebtInfo } = useDebtInfo(ETHPBTCDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);

  const ETHPUSDTVL = useTVL(
    ETHPUSDDebt?.mortgagePoolContract,
    ETHPUSDDebt?.mortgageToken,
    ETHPUSDDebtInfo?.mortgagePrice
  );
  const ETHPBTCTVL = useTVL(
    ETHPBTCDebt?.mortgagePoolContract,
    ETHPBTCDebt?.mortgageToken,
    ETHPUSDDebtInfo?.mortgagePrice
  )
  const NESTPUSDTVL = useTVL(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken,
    NESTPUSDDebtInfo?.mortgagePrice
  );
  const NESTPETHTVL = useTVL(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken,
    NESTPUSDDebtInfo?.mortgagePrice
  );
  const NESTPBTCTVL = useTVL(
    NESTPBTCDebt?.mortgagePoolContract,
    NESTPBTCDebt?.mortgageToken,
    NESTPUSDDebtInfo?.mortgagePrice
  )
  const ETHPUSDStaked = useStaked(
    ETHPUSDDebt?.mortgagePoolContract,
    ETHPUSDDebt?.mortgageToken
  );
  const ETHPBTCStaked = useStaked(
    ETHPBTCDebt?.mortgagePoolContract,
    ETHPBTCDebt?.mortgageToken
  )
  const NESTPUSDStaked = useStaked(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );
  const NESTPETHStaked = useStaked(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken
  );
  const NESTPBTCStaked = useStaked(
    NESTPBTCDebt?.mortgagePoolContract,
    NESTPBTCDebt?.mortgageToken
  )
  const maxRatioETH = useMaxRatio(
    ETHPUSDDebt?.mortgagePoolContract,
    ETHPUSDDebt?.mortgageToken
  );
  const maxRatioNEST = useMaxRatio(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );

  const PUSDTotalSupply = useTotalSupply(parasset?.externalTokens["PUSD"]);
  const PETHTotalSupply = useTotalSupply(parasset?.externalTokens["PETH"]);
  const PBTCTotalSupply = useTotalSupply(parasset?.externalTokens["PBTC"]);

  const ETHTVL = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(new BigNumber(ETHPUSDTVL).plus(ETHPBTCTVL).toNumber()));
  }, [ETHPUSDTVL, ETHPBTCTVL]);

  const NESTTVL = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(NESTPUSDTVL).plus(NESTPETHTVL).plus(NESTPBTCTVL).toNumber())
    );
  }, [NESTPUSDTVL, NESTPETHTVL, NESTPBTCTVL]);

  const ETHStaked = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(new BigNumber(ETHPUSDStaked).plus(ETHPBTCStaked).toNumber()));
  }, [ETHPUSDStaked, ETHPBTCStaked]);

  const NESTStaked = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(NESTPUSDStaked).plus(NESTPETHStaked).plus(NESTPBTCStaked).toNumber()
      )
    );
  }, [NESTPUSDStaked, NESTPETHStaked, NESTPBTCStaked]);

  const list = useMemo(() => {
    return [
      {
        name: "ETH",
        TVL: ETHTVL,
        staked: ETHStaked,
        maxRatio: $isPositiveNumber(
          $isFiniteNumber(new BigNumber(maxRatioETH).times(100).toNumber())
        ),

        liqRatio: $isPositiveNumber(
          $isFiniteNumber(
            new BigNumber(ETHPUSDDebtInfo.liqRatio).times(100).toNumber()
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
            name: "PBTC",
            id: "PBTC",
          },
        ],
      },
      {
        name: "NEST",
        TVL: NESTTVL,
        staked: NESTStaked,
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
          {
            name: "PBTC",
            id: "PBTC",
          },
        ],
      },
    ];
  }, [
    ETHTVL,
    NESTTVL,
    maxRatioETH,
    maxRatioNEST,
    ETHPUSDDebtInfo,
    NESTPUSDDebtInfo,
    ETHStaked,
    NESTStaked,
  ]);
  const totalMortgageAssetValue = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(ETHTVL).plus(NESTTVL).toNumber())
    );
  }, [ETHTVL, NESTTVL]);

  const parassetValue = useMemo(() => {
    // 平行资产总供应*对U价值
    const PUSDValue = new BigNumber(PUSDTotalSupply).times(1);

    const PETHValue = new BigNumber(PETHTotalSupply).times(
      ETHPUSDDebtInfo?.mortgagePrice
    );

    const PBTCValue = new BigNumber(PBTCTotalSupply)
      .times(ETHPUSDDebtInfo?.mortgagePrice)
      .div(ETHPBTCDebtInfo?.mortgagePrice)

    return $isPositiveNumber(
      $isFiniteNumber(PUSDValue.plus(PETHValue).plus(PBTCValue).toNumber())
    );
  }, [PUSDTotalSupply, PETHTotalSupply, PBTCTotalSupply, ETHPUSDDebtInfo?.mortgagePrice, ETHPBTCDebtInfo?.mortgagePrice]);

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
        text={"Staked Assets TVL"}
        color="#000"
        value={<Value value={totalMortgageAssetValue} prefix="$" />}
      />
      <BigValue
        text={"Parallel Assets CMV"}
        color="#000"
        value={<Value value={parassetValue} prefix="$" />}
      />
      <BigValue
        text={"Insurance Pool TVL"}
        color="#000"
        value={<Value value={totalItankValue} prefix="$" />}
      />
      <TableTitle titles={titles} />
      <TableList list={list} />
      <Footer />
    </>
  );
};

export default Home;
