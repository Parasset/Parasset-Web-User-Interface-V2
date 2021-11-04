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
import { getWeekDate, getMonthDate, getAllDate } from "../../utils/utils";
import useUserDatum from "./../../hooks/datum/useUserDatum";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const activeUsers = useRef(null);
  let chartInstance = null;
  const { activeUsers: activeUserList } = useUserDatum();

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

      dataZoom: [
        {
          show: true,
          realtime: true,
          start: 0,
          end: 50,
        },
        {
          type: "inside",
          realtime: true,
          start: 0,
          end: 50,
        },
      ],
      series: [
        {
          data: [
            ["2019-08-14", 150],
            ["2019-08-15", 230],
            ["2019-08-16", 224],
            ["2019-08-17", 218],
            ["2019-08-18", 135],
            ["2019-08-19", 147],
            ["2019-08-20", 260],
            ["2019-08-21", 260],
            ["2019-08-22", 260],
            ["2019-08-23", 260],
            ["2019-08-24", 260],
            ["2019-08-25", 260],
            ["2019-08-26", 260],
            ["2019-08-27", 260],
            ["2019-08-28", 260],
            ["2019-08-29", 260],
            ["2019-08-30", 260],
            ["2019-08-31", 260],
            ["2019-09-01", 260],
            ["2019-09-02", 260],
            ["2019-09-03", 260],
            ["2019-09-04", 260],
            ["2019-09-05", 260],
            ["2019-09-06", 260],
          ],
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
