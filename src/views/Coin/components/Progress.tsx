//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import BigNumber from "bignumber.js";
import { useTranslation } from "react-i18next";
import Value from "../../../components/Value";

const Progress: React.FC = ({ ratio, maxRatio, liqRatio }) => {
  const { t } = useTranslation();

  const progressColor = useMemo(() => {
    const rate = new BigNumber(ratio).div(100);
    const maxRate = new BigNumber(maxRatio);
    const maxRatio70 = maxRate.times(0.7);

    if (rate.gte(0) && rate.lt(maxRatio70)) {
      return "#0CC69D";
    } else if (rate.gte(maxRatio70) && rate.lt(maxRate)) {
      return "#0297D8";
    } else if (rate.gte(maxRate) && rate.lt(liqRatio)) {
      return "#EAAC5F";
    } else if (rate.gte(liqRatio)) {
      return "#EE144C";
    }
  }, [ratio, maxRatio, liqRatio]);

  const percent = useMemo(() => {
    let rate = new BigNumber(ratio).gt(100)
      ? new BigNumber(100)
      : new BigNumber(ratio);
    let percent = rate.div(100).times(180).minus(135).toNumber();

    return percent;
  }, [ratio]);
  return (
    <>
      <StyledWrapBox>
        <StyledTag color={progressColor}>
          {t(
            progressColor === "#0CC69D"
              ? "jiankang"
              : progressColor === "#0297D8"
              ? "jiankong"
              : progressColor === "#EAAC5F"
              ? "yujing"
              : "daiqingsuan"
          )}
        </StyledTag>
        <div className="color-grey flex1 text-right margin-right-10">0%</div>
        <StyledProgress className="text-center" id="tip-box">
          <StyledProgressLine color={progressColor} percent={percent} />
          <StyledProgressGrey />

          <div
            className=" bold-600 font-size-32"
            style={{ color: progressColor }}
          >
            <Value value={ratio} decimals={2} suffix="%" />
          </div>
          <Tooltip title={t("tip1")}>
            <StyledRatio className="color-grey text-underline text-nowrap">
              {t("dqdyl")}
            </StyledRatio>
          </Tooltip>
        </StyledProgress>
        <div className="color-grey flex1 text-left margin-left-10">100%</div>
      </StyledWrapBox>
    </>
  );
};
// #0297D8
// #EE144C
// #0CC69D
// #EAAC5F
const StyledWrapBox = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;
const StyledProgress = styled.div`
  width: 200px;
  height: 100px;

  border-bottom: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;
const StyledProgressLine = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-left: 2px solid ${({ color }) => color};
  border-top: 2px solid ${({ color }) => color};
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  transform: rotate(${({ percent }) => percent}deg);
`;
const StyledProgressGrey = styled.div`
  width: 200px;
  height: 100px;
  border-radius: 100px 100px 0px 0px;
  border: 2px solid ${(props) => props.theme.color.grey[400]};
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
`;
const StyledRatio = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
`;
const StyledTag = styled.div`
  position: absolute;
  left: 0;
  top: 20px;
  background: ${({ color }) => color};
  border-radius: 0px 20px 20px 0px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 0 8px;
  font-size: 12px;
`;
export default Progress;
