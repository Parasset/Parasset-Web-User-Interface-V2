//@ts-nocheck
import React from "react";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Label from "../../../components/Label";
import Button from "../../../components/Button";
import Account from "./Account";
import useIsMobile from "../../../hooks/useIsMobile";
const MyInfo: React.FC = ({  }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <Card className={` ${isMobile ? "wing-blank" : "wing-blank-lg"} `}>
        <Spacer size="mmd" />

        <div className={` ${isMobile ? "" : "wing-blank"} `}>
          <div className={` ${isMobile ? "" : "wing-blank-lg"} `}>
            <div className="color-grey">我的保险账户</div>
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
          <Spacer />
          <Label
            label="我的份额 ( LP-USD )"
            value="10,000"
            className="wing-blank-lg"
          />
          <Spacer size="mmd" />
          <Label label="我的占比" value="2%" className="wing-blank-lg" />
          <Spacer size="mmd" />
          <div className="flex-jc-center">
            <Button variant="secondary" text="授权 USDT" width="47%" />
            <Button variant="tertiary" text="提取" width="47%" />
          </div>
          <Spacer />
          <div className="text-center">
            <a href="" className="color-light-blue">
              质押 LP-USD 挖 ASET
            </a>
          </div>
          <Spacer />
          <div className="color-grey text-center">
            说明：注入保险后，在指定日期范围内方可赎回，赎回窗口期为 2 天
          </div>
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer />
    </>
  );
};

export default MyInfo;
