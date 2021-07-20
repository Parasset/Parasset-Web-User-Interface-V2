//@ts-nocheck
import React, { useMemo } from "react";
import styled from "styled-components";
import BigNumber from "bignumber.js";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import TokenSymbol from "../../../components/TokenSymbol";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useItankInfo from "../../../hooks/itank/useItankInfo";
const Item: React.FC = ({ item }) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const history = useHistory();
  const myShare = useTokenBalance(item?.itankContract);
  const { itankInfo } = useItankInfo(item);
  const myRatio = useMemo(() => {
    //我的LP余额除总供应
    const ratio = new BigNumber(myShare)
      .div(itankInfo.totalSupply)
      .times(100)
      .toNumber();
    return !Number.isFinite(ratio) ? 0 : ratio;
  }, [myShare, itankInfo.totalSupply]);
  return (
    <>
      <StyledWrapBox className={`wing-blank-lg ${isMobile ? "" : "width-47"} `}>
        <Spacer size="mmd" />
        <div className="flex-row-center-center">
          <TokenSymbol symbol={item.icon1} size={40} />
          <TokenSymbol symbol={item.icon2} size={40} isRight={true} />
        </div>
        <Spacer size="sm" />
        <div className="font-size-16 text-center">{item.name}</div>

        <Spacer size="mmd" />
        <Label label="TVL" value={<Value value={0} prefix="$" />} />

        <Spacer size="mmd" />
        <Label
          label={t("wdfe")}
          value={<Value value={myShare} decimals={6} />}
        />
        <Spacer size="mmd" />
        <Label label={t("wdzb")} value={<Value value={myRatio} suffix="%" />} />

        <Spacer />
        <Button
          text={t("xuanze")}
          variant="secondary"
          onClick={() => {
            history.push(`/itank/detail/${item.contract}`);
          }}
        />
        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};
const List: React.FC = ({ itanks }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `}>
        {itanks.map((item, i) => {
          return <Item item={item} key={item.name} />;
        })}
      </div>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};
const StyledWrapBox = styled(Card)`
  height: 330px;
  @media (max-width: 768px) {
    margin-bottom: 16px;
    height: auto;
  }
`;
export default List;
