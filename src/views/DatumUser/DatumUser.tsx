//@ts-nocheck
import React, {
  useCallback,
  useRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";
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
    });
  };

  let initChart = () => {
    let element = document.getElementById("main");
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

  useEffect(() => {
    initChart();
    renderChart();
  });

  return (
    <>
      <Container title={t("xzyh")}>
        <Picker>
          <div></div>
        </Picker>
        <div id={"main"} style={{ height: 400 }} />
      </Container>
      <Container title={t("hyyh")}>
        <Picker>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} ref={main2} />
      </Container>
    </>
  );
};

export default Overview;
