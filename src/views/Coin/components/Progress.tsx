//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
const Progress: React.FC = ({}) => {
  return (
    <>
      <StyledWrapBox>
        <div className="color-grey flex1 text-right margin-right-10">1%</div>
        <StyledProgress className="text-center">
          <StyledProgressLine />
          <StyledProgressGrey />

          <div className="color-light-pink bold-600 font-size-32">35%</div>
          <div className="color-grey text-underline">当前抵押率</div>
        </StyledProgress>
        <div className="color-grey flex1 text-left margin-left-10">70%</div>
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
  transform : rotate(-80deg);
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
export default Progress;
