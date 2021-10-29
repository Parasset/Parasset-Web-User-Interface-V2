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
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const main2 = useRef(null);
  let chartInstance = null;

  let renderChart = () => {
    const myChart = echarts.getInstanceByDom(
      (main2.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (main2.current as unknown) as HTMLDivElement
      );
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

  let initChart = () => {
    let element = document.getElementById("main");
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
  let initChart1 = () => {
    let element = document.getElementById("stakedAssets");
    let myChart = echarts.init(element as HTMLDivElement);
    let option = {
      title: {
        text: "抵押资产分布",
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
            { value: 1048, name: "ETH" },
            { value: 735, name: "USDT" },
         
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

  let initChart2 = () => {
    let element = document.getElementById("paralletlAssets");
    let myChart = echarts.init(element as HTMLDivElement);
    let option ={
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
    initChart();
    initChart1();
    initChart2();
    renderChart();
  });
  return (
    <>
      <Container title="TVL">
        <Picker>
          <div></div>
        </Picker>
        <div id={"main"} style={{ height: 400 }} />
      </Container>
      <Container title={t("zhaicang")}>
        <Picker>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} ref={main2} />
      </Container>
      <Container title={t("zcfb")}>
        <div id={"stakedAssets"} style={{ height: 400 }} />
        <div id={"paralletlAssets"} style={{ height: 400 }} />
      </Container>
    </>
  );
};

export default Overview;
