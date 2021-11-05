//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import * as echarts from "echarts";

import Container from "../../components/Datum/Container";

import Picker from "../../components/Datum/Picker";
import Value from "../../components/Value";
import useItankDatum from "./../../hooks/datum/useItankDatum";
const Overview: React.FC = () => {
  const { t } = useTranslation();

  const [tvlDatumValue, setTvlDatumValue] = useState("1W");

  const { tvlDatum } = useItankDatum({
    tvlDatumValue,
  });
  let initItankValueChart = useCallback(() => {
    let element = document.getElementById("itankValueChart");
    let myChart = echarts.init(element);

    myChart.setOption({
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
  }, []);
  let initTotalFeeIncomeChart = useCallback(() => {
    let element = document.getElementById("totalFeeIncome");
    let myChart = echarts.init(element);
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
  }, []);
  let initItankTvlChart = useCallback(() => {
    let element = document.getElementById("itankTvlChart");
    let myChart = echarts.init(element);
    const usdtList = tvlDatum.filter((item) => item.title === "USDT保险池");
    const ethList = tvlDatum.filter((item) => item.title === "ETH保险池");

    const usdtDatum = usdtList.map((item, i) => {
      return [item.x, item.y];
    });
    const ethDatum = ethList.map((item, i) => {
      return [item.x, item.y];
    });
    console.log(usdtList, ethList, usdtDatum, ethDatum);
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
  }, [tvlDatum]);

  useEffect(() => {
    initItankTvlChart();
    // initTotalFeeIncomeChart();
    // initItankValueChart();
  }, [tvlDatum]);

  return (
    <>
      <Container title={`${t("bxc")} TVL`}>
        <Picker value={tvlDatumValue} onChangePicker={setTvlDatumValue}>
          <div className="color-main">
            <Value value={234189341209} prefix="$" />
          </div>
        </Picker>
        <div id={"itankTvlChart"} style={{ height: 400 }} />
      </Container>

      {/* <Container title={t("ljsxfsr")}>
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
        <div style={{ height: 400 }} id="itankValueChart" />
      </Container> */}
    </>
  );
};

export default Overview;
