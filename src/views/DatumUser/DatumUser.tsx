//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as echarts from "echarts";
import useIsMobile from "../../hooks/useIsMobile";

import Container from "../../components/Datum/Container";

import Picker from "../../components/Datum/Picker";

import useUserDatum from "./../../hooks/datum/useUserDatum";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const [activeUsersValue, setActiveUsersValue] = useState("1W");
  const [newUsersValue, setNewUsersValue] = useState("1W");
  const { activeUsers, newUsers } = useUserDatum({
    activeUsersValue,
    newUsersValue,
  });

  const initActiveUsers = useCallback(() => {
    let element = document.getElementById("activeUsers");
    let myChart = echarts.init(element);
    const data = activeUsers.map((item, i) => {
      return [item.x, item.y];
    });
    myChart.setOption({
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
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
          data,
          type: "line",
        },
      ],
    });
  }, [activeUsers]);

  let initNewUsers = useCallback(() => {
    let element = document.getElementById("newUsers");
    let myChart = echarts.init(element);
    const data = newUsers.map((item, i) => {
      return [item.x, item.y];
    });
    myChart.setOption({
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
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
          data,
          type: "line",
        },
      ],
    });
  }, [newUsers]);

  useEffect(() => {
    initNewUsers();
    initActiveUsers();
  }, [activeUsers, newUsers]);

  return (
    <>
      <Container title={t("xzyh")}>
        <Picker value={newUsersValue} onChangePicker={setNewUsersValue}>
          <div></div>
        </Picker>
        <div id={"newUsers"} style={{ height: 400 }} />
      </Container>
      <Container title={t("hyyh")}>
        <Picker value={activeUsersValue} onChangePicker={setActiveUsersValue}>
          <div></div>
        </Picker>
        <div style={{ height: 400 }} id={"activeUsers"} />
      </Container>
    </>
  );
};

export default Overview;
