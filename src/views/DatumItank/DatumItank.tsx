//@ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import * as echarts from "echarts";
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
        data: ["USDT保险池", "ETH保险池"],
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
          name: "USDT保险池",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "ETH保险池",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    });
  };
  let initChart1 = () => {
    let element = document.getElementById("totalFeeIncome");
    let myChart = echarts.init(element as HTMLDivElement);
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    myChart.setOption(option);
  };
  let initChart = () => {
    let element = document.getElementById("main");
    let myChart = echarts.init(element as HTMLDivElement);
    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["USDT保险池", "ETH保险池"],
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
          name: "USDT保险池",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "ETH保险池",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    myChart.setOption(option);
  };

  useEffect(() => {
    initChart();
    initChart1();
    renderChart();
  });

  return (
    <>
      <Container title={`${t("bxc")} TVL`}>
        <Picker>
          <div className="color-main">
            <Value value={234189341209} prefix="$" />
          </div>
        </Picker>
        <div id={"main"} style={{ height: 400 }} />
      </Container>

      <Container title={t("ljsxfsr")}>
        <Picker>
          <div className="color-main">
            <Value value={234189341209} prefix="$" />
          </div>
        </Picker>
        <div id={"totalFeeIncome"} style={{ height: 400 }} />
      </Container>
      <Container title={t("bxcjz")}>
        <Picker>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} ref={main2} />
      </Container>
    </>
  );
};

export default Overview;
