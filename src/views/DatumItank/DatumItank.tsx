//@ts-nocheck
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import * as echarts from "echarts";

import Container from "../../components/Datum/Container";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";
import Picker from "../../components/Datum/Picker";
import Value from "../../components/Value";
import useItankDatum from "./../../hooks/datum/useItankDatum";
const Overview: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [tvlDatumValue, setTvlDatumValue] = useState("1W");
  const [feeDatumValue, setFeeDatumValue] = useState("1W");
  const [netValueDatumValue, setNetValueDatumValue] = useState("1W");
  const [recentTvlDatum, setRecentTvlDatum] = useState(0);
  const [recentFeeDatum, setRecentFeeDatum] = useState(0);

  const { tvlDatum, feeDatum, netValueDatum } = useItankDatum({
    tvlDatumValue,
    feeDatumValue,
    netValueDatumValue,
  });



  let initItankValueChart = useCallback(() => {
    let element = document.getElementById("itankValueChart");
    let myChart = echarts.init(element);
    const usdtList = netValueDatum.filter((item) => item.type === "USDT");
    const ethList = netValueDatum.filter((item) => item.type === "ETH");

    const usdtDatum = usdtList.map((item, i) => {
      return [item.x, item.y];
    });
    const ethDatum = ethList.map((item, i) => {
      return [item.x, item.y];
    });
  

    const usdtRecentData = usdtList[usdtList.length - 1]?.y;
    const ethRecentData = ethList[ethList.length - 1]?.y;
    let recentFeeDatum = new BigNumber(usdtRecentData)
      .plus(ethRecentData)
      .toNumber();
    recentFeeDatum = $isPositiveNumber($isFiniteNumber(recentFeeDatum));
    setRecentFeeDatum(recentFeeDatum);

    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [`USDT${t("bxc")}`, `ETH${t("bxc")}`],
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
        min: function (value) {
          return value.min;
        },
      },
      series: [
        {
          name: `USDT${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: usdtDatum,
        },
        {
          name: `ETH${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: ethDatum,
        },
      ],
    };
    myChart.setOption(option);
  }, [netValueDatum, i18n.language]);

  let initTotalFeeIncomeChart = useCallback(() => {
    let element = document.getElementById("totalFeeIncome");
    let myChart = echarts.init(element);
    const usdtList = feeDatum.filter((item) => item.type === "USDT");
    const ethList = feeDatum.filter((item) => item.type === "ETH");

    const usdtDatum = usdtList.map((item, i) => {
      return [item.x, item.y];
    });
    const ethDatum = ethList.map((item, i) => {
      return [item.x, item.y];
    });

    const usdtRecentData = usdtList[usdtList.length - 1]?.y;
    const ethRecentData = ethList[ethList.length - 1]?.y;
    let recentFeeDatum = new BigNumber(usdtRecentData)
      .plus(ethRecentData)
      .toNumber();
    recentFeeDatum = $isPositiveNumber($isFiniteNumber(recentFeeDatum));
    setRecentFeeDatum(recentFeeDatum);

    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [`USDT${t("bxc")}`, `ETH${t("bxc")}`],
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
        min: function (value) {
          return value.min;
        },
      },
      series: [
        {
          name: `USDT${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: usdtDatum,
        },
        {
          name: `ETH${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: ethDatum,
        },
      ],
    };
    myChart.setOption(option);
  }, [feeDatum, i18n.language]);

  let initItankTvlChart = useCallback(() => {
    let element = document.getElementById("itankTvlChart");
    let myChart = echarts.init(element);
    const usdtList = tvlDatum.filter((item) => item.type === "USDT");
    const ethList = tvlDatum.filter((item) => item.type === "ETH");

    const usdtDatum = usdtList.map((item, i) => {
      return [item.x, item.y];
    });
    const ethDatum = ethList.map((item, i) => {
      return [item.x, item.y];
    });
    const usdtRecentData = usdtList[usdtList.length - 1]?.y;
    const ethRecentData = ethList[ethList.length - 1]?.y;
    let recentTvlDatum = new BigNumber(usdtRecentData)
      .plus(ethRecentData)
      .toNumber();
    recentTvlDatum = $isPositiveNumber($isFiniteNumber(recentTvlDatum));
    setRecentTvlDatum(recentTvlDatum);

    let option = {
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: [`USDT${t("bxc")}`, `ETH${t("bxc")}`],
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
          name: `USDT${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: usdtDatum,
        },
        {
          name: `ETH${t("bxc")}`,
          type: "line",
          stack: "Total",
          data: ethDatum,
        },
      ],
    };
    myChart.setOption(option);
  }, [tvlDatum, i18n.language]);

  useEffect(() => {
    initItankTvlChart();
  }, [tvlDatum, feeDatum, i18n.language]);

  useEffect(() => {
    initTotalFeeIncomeChart();
  }, [feeDatum, i18n.language]);


  useEffect(() => {
    initItankValueChart();
  }, [netValueDatum, i18n.language]);


  
  return (
    <>
      <Container title={`${t("bxc")} TVL`}>
        <Picker value={tvlDatumValue} onChangePicker={setTvlDatumValue}>
          <div className="color-main">
            <Value value={recentTvlDatum} prefix="$" />
          </div>
        </Picker>
        <div id={"itankTvlChart"} style={{ height: 400 }} />
      </Container>

      <Container title={t("ljsxfsr")}>
        <Picker value={feeDatumValue} onChangePicker={setFeeDatumValue}>
          <div className="color-main">
            <Value value={recentFeeDatum} prefix="$" />
          </div>
        </Picker>
        <div id={"totalFeeIncome"} style={{ height: 400 }} />
      </Container>
      <Container title={t("bxcjz")}>
        <Picker
          value={netValueDatumValue}
          onChangePicker={setNetValueDatumValue}
        >
          <div></div>
        </Picker>
        <div style={{ height: 400 }} id="itankValueChart" />
      </Container>
    </>
  );
};

export default Overview;
