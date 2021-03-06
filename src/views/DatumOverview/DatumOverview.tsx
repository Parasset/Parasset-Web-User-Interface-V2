//@ts-nocheck
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import Container from "../../components/Datum/Container";
import ListItem from "../../components/Datum/ListItem";
import Value from "../../components/Value";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useStaked from "../../hooks/debt/useStaked";
import useParasset from "./../../hooks/useParasset";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
import useItanks from "./../../hooks/itank/useItanks";
import useItankInfo from "./../../hooks/itank/useItankInfo";
import useUserOverview from "./../../hooks/datum/useUserOverview";
import useDebtOverview from "./../../hooks/datum/useDebtOverview";
const Overview: React.FC = () => {
  const { t } = useTranslation();
  const parasset = useParasset();
  const PUSDToken = parasset?.externalTokens["PUSD"];
  const PETHToken = parasset?.externalTokens["PETH"];
  const PBTCToken = parasset?.externalTokens["PBTC"];

  const PUSDTotalSupply = useTotalSupply(PUSDToken);
  const PETHTotalSupply = useTotalSupply(PETHToken);
  const PBTCTotalSupply = useTotalSupply(PBTCToken);

  const { userOverview } = useUserOverview();
  const { debtOverview } = useDebtOverview();

  const ETHPUSDDebt = useDebt("ETHPUSD");
  const ETHPBTCDebt = useDebt("ETHPBTC");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const NESTPBTCDebt = useDebt("NESTPBTC");

  const { info: ETHPUSDDebtInfo } = useDebtInfo(ETHPUSDDebt);
  const { info: ETHPBTCDebtInfo } = useDebtInfo(ETHPBTCDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);

  const itanks = useItanks();
  //两个保险池相加
  const { itankInfo: USDTItankInfo } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: ETHItankInfo } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
  const { itankInfo: HBTCItankInfo } = useItankInfo(
    itanks.length ? itanks[2] : null
  );

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
  );

  const ETHPUSDStaked = useStaked(
    ETHPUSDDebt?.mortgagePoolContract,
    ETHPUSDDebt?.mortgageToken
  );
  const ETHPBTCStaked = useStaked(
    ETHPBTCDebt?.mortgagePoolContract,
    ETHPBTCDebt?.mortgageToken
  );
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
  );

  const parassetValue = useMemo(() => {
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
  }, [
    PUSDTotalSupply,
    PETHTotalSupply,
    PBTCTotalSupply,
    ETHPUSDDebtInfo?.mortgagePrice,
    ETHPBTCDebtInfo?.mortgagePrice
  ]);

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

  const totalMortgageAssetValue = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(ETHTVL).plus(NESTTVL).toNumber())
    );
  }, [ETHTVL, NESTTVL]);

  const USDTItankValue = useMemo(() => {
    let tvl1 = new BigNumber(USDTItankInfo.depositFundValue).plus(
      USDTItankInfo.earnFundValue
    );
    return $isPositiveNumber($isFiniteNumber(tvl1.toNumber()));
  }, [USDTItankInfo.depositFundValue, USDTItankInfo.earnFundValue]);

  const ETHItankValue = useMemo(() => {
    let tvl2 = new BigNumber(ETHItankInfo.depositFundValue).plus(
      ETHItankInfo.earnFundValue
    );
    return $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
  }, [ETHItankInfo.depositFundValue, ETHItankInfo.earnFundValue]);

  const HBTCItankValue = useMemo(() => {
    let tvl2 = new BigNumber(HBTCItankInfo.depositFundValue).plus(
      HBTCItankInfo.earnFundValue
    );
    return $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
  }, [HBTCItankInfo.depositFundValue, HBTCItankInfo.earnFundValue]);

  const totalItankValue = useMemo(() => {
    //保险池内资产两种币的总和换成USDT

    return $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(USDTItankValue)
          .plus(ETHItankValue)
          .plus(HBTCItankValue)
          .toNumber()
      )
    );
  }, [USDTItankValue, ETHItankValue, HBTCItankValue]);

  return (
    <>
      <Container title={t("dyzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text="TVL"
            color="#000"
            value={<Value value={totalMortgageAssetValue} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("dysl")}`}
            color="#000"
            value={<Value value={ETHStaked} />}
          />
          <ListItem
            text={`NEST ${t("dysl")}`}
            color="#000"
            value={<Value value={NESTStaked} />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("pxzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("pxzczjz")}
            color="#000"
            value={<Value value={parassetValue} prefix="$" />}
          />
          <ListItem
            text={`PUSD ${t("ltl")}`}
            color="#000"
            value={
              <Value
                value={PUSDTotalSupply}
                suffix={
                  <span className="font-size-14 margin-left-4">PUSD</span>
                }
              />
            }
          />
          <ListItem
            text={`PETH ${t("ltl")}`}
            color="#000"
            value={
              <Value
                value={PETHTotalSupply}
                suffix={
                  <span className="font-size-14 margin-left-4">PETH</span>
                }
              />
            }
          />
          <ListItem
            text={`PBTC ${t("ltl")}`}
            color="#000"
            value={
              <Value
                value={PBTCTotalSupply}
                suffix={
                  <span className="font-size-14 margin-left-4">PBTC</span>
                }
              />
            }
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("zhaicang")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("zczs")}
            color="#000"
            value={<Value value={debtOverview.count} />}
          />
          <ListItem
            text={t("dqdyl")}
            color="#000"
            value={<Value value={debtOverview.rate} suffix="%" />}
            showSpacer={false}
          />
          {/* <ListItem
            text={t("ljqse")}
            color="#B88450"
            value={<Value value={1000000} prefix="$" />}
            showSpacer={false}
          /> */}
        </div>
      </Container>
      <Container title={t("bxc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text="TVL"
            color="#000"
            value={<Value value={totalItankValue} prefix="$" />}
          />
          <ListItem
            text={`USDT ${t("bxc")} TVL`}
            color="#000"
            value={<Value value={USDTItankValue} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("bxc")} TVL`}
            color="#000"
            value={<Value value={ETHItankValue} prefix="$" />}
          />
          <ListItem
            text={`HBTC ${t("bxc")} TVL`}
            color="#000"
            value={<Value value={HBTCItankValue} prefix="$" />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("yonghu")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("ljyh")}
            color="#000"
            value={<Value value={userOverview.total} />}
          />
          <ListItem
            text={t("zbljyh")}
            color="#000"
            value={<Value value={userOverview.coin} />}
          />
          <ListItem
            text={t("bxcljyh")}
            color="#000"
            value={<Value value={userOverview.ins} />}
          />
          <ListItem
            text={t("dhljyh")}
            color="#000"
            value={<Value value={userOverview.exchange} />}
            showSpacer={false}
          />
        </div>
      </Container>
    </>
  );
};

export default Overview;
