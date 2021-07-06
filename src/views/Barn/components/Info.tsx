//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";
const Info: React.FC = ({}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Card className="wing-blank-lg">
        <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
          <div
            className={`wing-blank-lg ${isMobile ? "" : "flex1 bd-right1 "} `}
          >
            <Spacer size={isMobile ? "mmd" : "md"} />
            <div className="color-grey">清算价格</div>
            <div className="wing-blank">
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="font-size-24 bold-600 text-center">
                0.3436 USDT
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="flex-jc-center">
                <Label label="当前 NEST-USDT 价格" value="0.1635" />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
            </div>
            {
              isMobile?null: <Spacer size={isMobile ? "mmd" : "md"} />
            }
          </div>
          <div className={`wing-blank-lg ${isMobile ? "" : "flex1  "} `}>
            <Spacer size={isMobile ? "mmd" : "md"} />
            <div className="color-grey">当前抵押率</div>
            <div className="wing-blank">
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="font-size-24 bold-600 text-center">73.45 %</div>
              <Spacer size={isMobile ? "mmd" : "md"} />
              <div className="flex-jc-center">
                <Label label="清算抵押率" value="0.1635" />
              </div>
              <Spacer size={isMobile ? "mmd" : "md"} />
            </div>
            {
              isMobile?null: <Spacer size={isMobile ? "mmd" : "md"} />
            }
           
          </div>
        </div>
      </Card>
      <Spacer />
    </>
  );
};

export default Info;
