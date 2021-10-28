//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import BigNumber from "bignumber.js";
import useIsMobile from "../../hooks/useIsMobile";
import { $isFiniteNumber, $isPositiveNumber } from "../../utils/utils";

import Container from "../../components/Datum/Container";
import ListItem from "../../components/Datum/ListItem";
import Value from "../../components/Value";
const Overview: React.FC = () => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <Container title={t("dyzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text="TVL"
            color="#FA6141"
            value={<Value value={1000000} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("dysl")}`}
            color="#FA6141"
            value={<Value value={1000000} prefix="$" />}
          />
          <ListItem
            text={`NEST ${t("dysl")}`}
            color="#FA6141"
            value={<Value value={1000000} prefix="$" />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("pxzc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("pxzczjz")}
            color="#03AEB1"
            value={<Value value={1000000} prefix="$" />}
          />
          <ListItem
            text={`PUSD ${t("ltl")}`}
            color="#03AEB1"
            value={
              <Value
                value={1000000}
                suffix={
                  <span className="font-size-14 margin-left-4">PUSD</span>
                }
              />
            }
          />
          <ListItem
            text={`PETH ${t("ltl")}`}
            color="#03AEB1"
            value={
              <Value
                value={1000000}
                suffix={
                  <span className="font-size-14 margin-left-4">PETH</span>
                }
              />
            }
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("zhaicang")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("zczs")}
            color="#B88450"
            value={<Value value={1000000} />}
          />
          <ListItem
            text={t("dqdyl")}
            color="#B88450"
            value={<Value value={1000000} suffix="%" />}
          />
          <ListItem
            text={t("ljqse")}
            color="#B88450"
            value={<Value value={1000000} prefix="$" />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("bxc")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text="TVL"
            color="#00A0E9"
            value={<Value value={1000000} prefix="$" />}
          />
          <ListItem
            text={`USDT ${t("bxc")} TVL`}
            color="#00A0E9"
            value={<Value value={1000000} prefix="$" />}
          />
          <ListItem
            text={`ETH ${t("bxc")} TVL`}
            color="#00A0E9"
            value={<Value value={1000000} prefix="$" />}
            showSpacer={false}
          />
        </div>
      </Container>
      <Container title={t("yonghu")}>
        <div className="flex-jc-center-pc">
          <ListItem
            text={t("ljyh")}
            color="#11A538"
            value={<Value value={1000000} />}
          />
          <ListItem
            text={t("zbljyh")}
            color="#11A538"
            value={<Value value={1000000} />}
          />
          <ListItem
            text={t("bxcljyh")}
            color="#11A538"
            value={<Value value={1000000} />}
          />
          <ListItem
            text={t("dhljyh")}
            color="#11A538"
            value={<Value value={1000000} />}
            showSpacer={false}
          />
        </div>
      </Container>
    </>
  );
};

export default Overview;
