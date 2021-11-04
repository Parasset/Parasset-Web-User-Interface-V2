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
import ListItem from "../../components/Datum/ListItem";
import Picker from "../../components/Datum/Picker";
import Value from "../../components/Value";

import useCoinDatum from "../../hooks/datum/useCoinDatum";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const debtChart = useRef(null);
  const { coinData } = useCoinDatum();
  console.log("🚀 ~ file: DatumCoin.tsx ~ line 26 ~ coinData", coinData);
  let chartInstance = null;

  let initDebtChart = () => {
    const myChart = echarts.getInstanceByDom(debtChart.current);
    if (myChart) chartInstance = myChart;
    else chartInstance = echarts.init(debtChart.current);
    chartInstance.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["抵押资产", "平行资产"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "抵押资产",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "平行资产",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    });
  };

  let initTvlChart = () => {
    let element = document.getElementById("tvlChart");
    let myChart = echarts.init(element as HTMLDivElement);
    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["债仓数", "平均抵押率"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },

      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "债仓数",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "平均抵押率",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    myChart.setOption(option);
  };
  let initStakedAssetsChart = useCallback(() => {
    let element = document.getElementById("stakedAssets");
    let myChart = echarts.init(element);
    myChart.setOption(coinData);
  }, [coinData]);

  let initParalletlAssetsChart = () => {
    let element = document.getElementById("paralletlAssets");
    let myChart = echarts.init(element as HTMLDivElement);
    let option = {
      title: {
        text: "平行资产分布",
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
            { value: 1048, name: "PUSD" },
            { value: 735, name: "PETH" },
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
  };

  useEffect(() => {
    initTvlChart();
    initStakedAssetsChart();
    initParalletlAssetsChart();
    initDebtChart();
  }, [coinData]);

  return (
    <>
      <Container title="TVL">
        <Picker>
          <div></div>
        </Picker>
        <div id={"tvlChart"} style={{ height: 400 }} />
      </Container>
      <Container title={t("zhaicang")}>
        <Picker>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} ref={debtChart} />
      </Container>
      <Container title={t("zcfb")}>
        <div id={"stakedAssets"} style={{ height: 400 }} />
        <div id={"paralletlAssets"} style={{ height: 400 }} />
      </Container>
    </>
  );
};

export default Overview;
