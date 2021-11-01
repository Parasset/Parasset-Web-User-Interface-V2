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
  const activeUsers = useRef(null);
  let chartInstance = null;

  let initActiveUsers = () => {
    const myChart = echarts.getInstanceByDom(
      (activeUsers.current as unknown) as HTMLDivElement
    );
    if (myChart) chartInstance = myChart;
    else
      chartInstance = echarts.init(
        (activeUsers.current as unknown) as HTMLDivElement
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

  let initNewUsers = () => {
    let element = document.getElementById("newUsers");
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
    initNewUsers();
    initActiveUsers();
  });

  return (
    <>
      <Container title={t("xzyh")}>
        <Picker>
          <div></div>
        </Picker>
        <div id={"newUsers"} style={{ height: 400 }} />
      </Container>
      <Container title={t("hyyh")}>
        <Picker>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} ref={activeUsers} />
      </Container>
    </>
  );
};

export default Overview;
