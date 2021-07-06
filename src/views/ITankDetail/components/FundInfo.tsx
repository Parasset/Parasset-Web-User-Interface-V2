//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Account from "./Account";
import useIsMobile from "../../../hooks/useIsMobile";
const FundInfo: React.FC = ({}) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Card className={` ${isMobile ? "wing-blank" : "wing-blank-lg"} `}>
        <Spacer size="mmd" />
        <div className={` ${isMobile ? "" : "wing-blank"} `}>
          <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
            <div className="flex-jc-center">
              <div className="color-grey">我的保险账户</div>
              <div>
                <span className="color-grey">当前净值：</span>
                <span className="text-underline">1.023846</span>
              </div>
            </div>
          </div>
          <Spacer size="mmd" />
          <Account
            icon={require("../../../assets/img/USDT_icon.png")}
            currency="USDT"
          />

          <Spacer />
          <Account
            icon={require("../../../assets/img/PUSDT_icon.png")}
            currency="PUSD"
          />
        </div>

        <Spacer size="mmd" />
      </Card>
    </>
  );
};

export default FundInfo;
