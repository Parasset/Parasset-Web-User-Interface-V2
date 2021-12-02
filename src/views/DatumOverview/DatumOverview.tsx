//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import Container from "../../components/Datum/Container";
import ListItem from "../../components/Datum/ListItem";
import Value from "../../components/Value";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useStaked from "../../hooks/debt/useStaked";
import useBasisCash from "./../../hooks/useBasisCash";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
import useItanks from "./../../hooks/itank/useItanks";
import useItankInfo from "./../../hooks/itank/useItankInfo";
import useUserOverview from "./../../hooks/datum/useUserOverview";
import useDebtOverview from "./../../hooks/datum/useDebtOverview";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const basisCash = useBasisCash();
  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];
  const PUSDTotalSupply = useTotalSupply(PUSDToken);
  const PETHTotalSupply = useTotalSupply(PETHToken);
  const { userOverview } = useUserOverview();
  const { debtOverview } = useDebtOverview();
  const ETHDebt = useDebt("ETHPUSD");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const { info: ETHDebtInfo } = useDebtInfo(ETHDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);
  const { info: NESTPETHDebtfo } = useDebtInfo(NESTPETHDebt);
  const itanks = useItanks();
  //两个保险池相加
  const { itankInfo: itankInfo1 } = useItankInfo(
    itanks.length ? itanks[0] : null
  );
  const { itankInfo: itankInfo2 } = useItankInfo(
    itanks.length ? itanks[1] : null
  );
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

  const ETHPUSDStaked = useStaked(
    ETHDebt?.mortgagePoolContract,
    ETHDebt?.mortgageToken
  );

  const NESTPUSDStaked = useStaked(
    NESTPUSDDebt?.mortgagePoolContract,
    NESTPUSDDebt?.mortgageToken
  );
  const NESTPETHStaked = useStaked(
    NESTPETHDebt?.mortgagePoolContract,
    NESTPETHDebt?.mortgageToken
  );

  const parassetValue = useMemo(() => {
    //两个平行资产总供应*对U价值
    const PUSDValue = new BigNumber(PUSDTotalSupply).times(1);

    const PETHValue = new BigNumber(PETHTotalSupply).times(
      ETHDebtInfo?.mortgagePrice
    );
    return $isPositiveNumber(
      $isFiniteNumber(PUSDValue.plus(PETHValue).toNumber())
    );
  }, [PUSDTotalSupply, PETHTotalSupply, ETHDebtInfo?.mortgagePrice]);

  const ETHTVL = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDTVL));
  }, [ETHPUSDTVL]);
  const NESTTVL = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(NESTPUSDTVL).plus(NESTPETHTVL).toNumber())
    );
  }, [NESTPUSDTVL, NESTPETHTVL]);

  const ETHStaked = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDStaked));
  }, [ETHPUSDStaked]);

  const NESTStaked = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(NESTPUSDStaked).plus(NESTPETHStaked).toNumber()
      )
    );
  }, [NESTPUSDStaked, NESTPETHStaked]);

  const totalmortgageAssetValue = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(ETHTVL).plus(NESTTVL).toNumber())
    );
  }, [ETHTVL, NESTTVL]);

  const USDTItankValue = useMemo(() => {
    let tvl1 = new BigNumber(itankInfo1.depositFundValue).plus(
      itankInfo1.earnFundValue
    );
    tvl1 = $isPositiveNumber($isFiniteNumber(tvl1.toNumber()));
    return tvl1;
  }, [itankInfo1.depositFundValue, itankInfo1.earnFundValue]);

  const ETHItankValue = useMemo(() => {
    let tvl2 = new BigNumber(itankInfo2.depositFundValue).plus(
      itankInfo2.earnFundValue
    );
    tvl2 = $isPositiveNumber($isFiniteNumber(tvl2.toNumber()));
    return tvl2;
  }, [itankInfo2.depositFundValue, itankInfo2.earnFundValue]);

  const totalItankValue = useMemo(() => {
    //保险池内资产两种币的总和换成USDT

    return $isPositiveNumber(
      $isFiniteNumber(
        new BigNumber(USDTItankValue).plus(ETHItankValue).toNumber()
      )
    );
  }, [USDTItankValue, ETHItankValue]);

  return (
    <>
      <Container title={t("dyzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text="TVL"
            color="#FA6141"
            value={<Value value={totalmortgageAssetValue} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("dysl")}`}
            color="#FA6141"
            value={<Value value={ETHStaked} />}
          />
          <ListItem
            text={`NEST ${t("dysl")}`}
            color="#FA6141"
            value={<Value value={NESTStaked} />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("pxzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("pxzczjz")}
            color="#03AEB1"
            value={<Value value={parassetValue} prefix="$" />}
          />
          <ListItem
            text={`PUSD ${t("ltl")}`}
            color="#03AEB1"
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
            color="#03AEB1"
            value={
              <Value
                value={PETHTotalSupply}
                suffix={
                  <span className="font-size-14 margin-left-4">PETH</span>
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
            color="#B88450"
            value={<Value value={debtOverview.count} />}
          />
          <ListItem
            text={t("dqdyl")}
            color="#B88450"
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
            color="#00A0E9"
            value={<Value value={totalItankValue} prefix="$" />}
          />
          <ListItem
            text={`USDT ${t("bxc")} TVL`}
            color="#00A0E9"
            value={<Value value={USDTItankValue} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("bxc")} TVL`}
            color="#00A0E9"
            value={<Value value={ETHItankValue} prefix="$" />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("yonghu")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("ljyh")}
            color="#11A538"
            value={<Value value={userOverview.total} />}
          />
          <ListItem
            text={t("zbljyh")}
            color="#11A538"
            value={<Value value={userOverview.coin} />}
          />
          <ListItem
            text={t("bxcljyh")}
            color="#11A538"
            value={<Value value={userOverview.ins} />}
          />
          <ListItem
            text={t("dhljyh")}
            color="#11A538"
            value={<Value value={userOverview.exchange} />}
            showSpacer={false}
          />
        </div>
      </Container>
    </>
  );
};

export default Overview;
