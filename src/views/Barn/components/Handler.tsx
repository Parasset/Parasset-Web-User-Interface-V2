//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";
import useIsMobile from "../../../hooks/useIsMobile";

const Info: React.FC = ({}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Card className="wing-blank-lg">
        <Spacer size="mmd" />
        <div className="bd-bottom">
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <div
              className={`wing-blank-lg ${isMobile ? "" : "flex1 bd-right1 "} `}
            >
              <div className="color-grey">{t('dyzc')}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <img
                    src={require("../../../assets/img/NEST_icon.png")}
                    width="40"
                    height="40"
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  10,000 NEST
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label label={t('shizhi')} value="$ 1,234.45" />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
            <div className="flex1 wing-blank-lg">
              <div className="color-grey">{t('yzbsl')}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <img
                    src={require("../../../assets/img/PUSDT_icon.png")}
                    width="40"
                    height="40"
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  294 PUSD
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label label={t('shizhi')} value="$ 1,234.45" />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
          </div>
          <Spacer size={isMobile ? "mmd" : "md"} />
        </div>
        <div>
          <Spacer size={isMobile ? "mmd" : "md"} />
          <div className={` ${isMobile ? "" : "flex-jc-center"} `}>
            <div
              className={`wing-blank-lg ${isMobile ? "" : "flex1 bd-right1 "} `}
            >
              <div className="color-grey">{t('ksh')}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <img
                    src={require("../../../assets/img/NEST_icon.png")}
                    width="40"
                    height="40"
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  10,000 NEST
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label label={t('shizhi')} value="$ 1,234.45" />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
            <div className="flex1 wing-blank-lg">
              <div className="color-grey">{t('kzb')}</div>
              <div className="wing-blank">
                <Spacer size={isMobile ? "mmd" : "md"} />

                <div className="flex-row-center-center ">
                  <img
                    src={require("../../../assets/img/PUSDT_icon.png")}
                    width="40"
                    height="40"
                  />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="font-size-24 bold-600 text-center">
                  10,000 PUSD
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
                <div className="flex-jc-center">
                  <Label label={t('shizhi')} value="$ 1,234.45" />
                </div>
                <Spacer size={isMobile ? "mmd" : "md"} />
              </div>
            </div>
          </div>
        </div>

        <Spacer size="mmd" />
      </Card>
      <Spacer size={isMobile ? "mmd" : "md"} />
    </>
  );
};

export default Info;
