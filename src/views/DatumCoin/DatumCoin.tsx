//@ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
import Container from "../../components/Datum/Container";

import Picker from "../../components/Datum/Picker";
import useBasisCash from "./../../hooks/useBasisCash";
import useCoinDatum from "../../hooks/datum/useCoinDatum";
import useDebt from "../../hooks/debt/useDebt";
import useTVL from "../../hooks/debt/useTVL";
import useDebtInfo from "../../hooks/debt/useDebtInfo";
import useTotalSupply from "./../../hooks/useTokenTotalSupply";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const basisCash = useBasisCash();
  const ETHDebt = useDebt("ETHPUSD");
  const NESTPUSDDebt = useDebt("NESTPUSD");
  const NESTPETHDebt = useDebt("NESTPETH");
  const { info: ETHDebtInfo } = useDebtInfo(ETHDebt);
  const { info: NESTPUSDDebtInfo } = useDebtInfo(NESTPUSDDebt);
  const { info: NESTPETHDebtfo } = useDebtInfo(NESTPETHDebt);

  const PUSDToken = basisCash?.externalTokens["PUSD"];
  const PETHToken = basisCash?.externalTokens["PETH"];
  const PUSDTotalSupply = useTotalSupply(PUSDToken);
  const PETHTotalSupply = useTotalSupply(PETHToken);
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

  const ETHTVL = useMemo(() => {
    return $isPositiveNumber($isFiniteNumber(ETHPUSDTVL));
  }, [ETHPUSDTVL]);
  const NESTTVL = useMemo(() => {
    return $isPositiveNumber(
      $isFiniteNumber(new BigNumber(NESTPUSDTVL).plus(NESTPETHTVL).toNumber())
    );
  }, [NESTPUSDTVL, NESTPETHTVL]);

  const [tvlDatumValue, setTvlDatumValue] = useState("1W");
  const [debtDatumValue, setDebtDatumValue] = useState("1W");
  const { tvlDatum, debtDatum } = useCoinDatum({
    tvlDatumValue,
    debtDatumValue,
  });

  const PUSDValue = useMemo(() => {
    //*对U价值
    const PUSDValue = new BigNumber(PUSDTotalSupply).times(1);

    return $isPositiveNumber($isFiniteNumber(PUSDValue.toNumber()));
  }, [PUSDTotalSupply]);

  const PETHValue = useMemo(() => {
    //*对U价值

    const PETHValue = new BigNumber(PETHTotalSupply).times(
      ETHDebtInfo?.mortgagePrice
    );
    return $isPositiveNumber($isFiniteNumber(PETHValue.toNumber()));
  }, [PETHTotalSupply, ETHDebtInfo?.mortgagePrice]);

  let initTvlChart = useCallback(() => {
    let element = document.getElementById("tvlChart");
    let myChart = echarts.init(element);

    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [t("dyzc"), t("pxzc")],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        axisLabel: {
          interval: 0,
          rotate: -20,
          formatter: function (value, index) {
            return echarts.format.formatTime("MM.dd", new Date(value));
            // return echarts.format.formatTime('yyyy-MM-dd', new Date(value));
          },
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: t("dyzc"),
          type: "line",
          stack: "Total",
          data: tvlDatum.morTvlDatum.map((item, i) => {
            return [item.x, item.y];
          }),
        },
        {
          name: t("pxzc"),
          type: "line",
          stack: "Total",
          data: tvlDatum.insTvlDatum.map((item, i) => {
            return [item.x, item.y];
          }),
        },
      ],
    };
    myChart.setOption(option);
  }, [tvlDatum]);

  let initDebtChart = useCallback(() => {
    let element = document.getElementById("debtChart");
    let myChart = echarts.init(element);

    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [t("zcs"), t("pjdyl")],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "time",
        axisLabel: {
          interval: 0,
          rotate: -20,
          formatter: function (value, index) {
            return echarts.format.formatTime("MM.dd", new Date(value));
            // return echarts.format.formatTime('yyyy-MM-dd', new Date(value));
          },
        },
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: t("zcs"),
          type: "line",
          stack: "Total",
          data: debtDatum.debtDatum.map((item, i) => {
            return [item.x, item.y];
          }),
        },
        {
          name: t("pjdyl"),
          type: "line",
          stack: "Total",
          data: debtDatum.avgRateDatum.map((item, i) => {
            return [item.x, item.y];
          }),
        },
      ],
    };
    myChart.setOption(option);
  }, [debtDatum]);

  let initStakedAssetsChart = useCallback(() => {
    let element = document.getElementById("stakedAssets");
    let myChart = echarts.init(element);
    myChart.setOption({
      title: {
        text: t("dyzcfb"),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: ETHTVL, name: "ETH" },
            { value: NESTTVL, name: "NEST" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }, [ETHTVL, NESTTVL]);

  let initParalletlAssetsChart = useCallback(() => {
    let element = document.getElementById("paralletlAssets");
    let myChart = echarts.init(element);
    let option = {
      title: {
        text: t("pxzcfb"),
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "left",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: [
            { value: PUSDValue, name: "PUSD" },
            { value: PETHValue, name: "PETH" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  }, [PUSDValue, PETHValue]);

  useEffect(() => {
    initStakedAssetsChart();
    initParalletlAssetsChart();
  }, []);

  useEffect(() => {
    initTvlChart();
  }, [tvlDatum, i18n.language]);

  useEffect(() => {
    initDebtChart();
  }, [debtDatum, i18n.language]);

  useEffect(() => {
    initStakedAssetsChart();
  }, [ETHTVL, NESTTVL, i18n.language]);

  useEffect(() => {
    initParalletlAssetsChart();
  }, [PUSDValue, PETHValue, i18n.language]);

  return (
    <>
      <Container title="TVL">
        <Picker value={tvlDatumValue} onChangePicker={setTvlDatumValue}>
          <div></div>
        </Picker>
        <div id={"tvlChart"} style={{ height: 400 }} />
      </Container>
      <Container title={t("zhaicang")}>
        <Picker value={debtDatumValue} onChangePicker={setDebtDatumValue}>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} id={"debtChart"} />
      </Container>
      <Container title={t("zcfb")}>
        <div id={"stakedAssets"} style={{ height: 400 }} />
        <div id={"paralletlAssets"} style={{ height: 400 }} />
      </Container>
    </>
  );
};

export default Overview;