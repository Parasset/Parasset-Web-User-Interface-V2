//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import Value from "../../../components/Value";

const Progress: React.FC = ({ ratio }) => {
  const { t } = useTranslation();
  return (
    <>
      <StyledWrapBox>
        <div className="color-grey flex1 text-right margin-right-10">0%</div>
        <StyledProgress className="text-center" id="tip-box">
          <StyledProgressLine />
          <StyledProgressGrey />

          <div className="color-light-pink bold-600 font-size-32">
            {" "}
            <Value value={ratio} decimals={2} />%
          </div>
          <Tooltip title={t("tip1")}>
            <StyledRatio className="color-grey text-underline">
              {t("dqdyl")}
            </StyledRatio>
          </Tooltip>
        </StyledProgress>
        <div className="color-grey flex1 text-left margin-left-10">100%</div>
      </StyledWrapBox>
    </>
  );
};

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
  border-left: 2px solid #ee144c;
  border-top: 2px solid #ee144c;
  /* border-right: 2px solid #ee144c; */
  box-sizing: border-box;
  background-color: transparent;
  border-bottom: none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  /* transform : rotate(-135deg); */
  transform: rotate(-80deg);
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
  z-index: 9999;
`;
export default Progress;
