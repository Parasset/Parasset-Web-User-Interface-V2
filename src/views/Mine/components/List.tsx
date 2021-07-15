//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TokenSymbol from "../../../components/TokenSymbol";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";
const Item: React.FC = ({ item }) => {
  const isMobile = useIsMobile();
  const history = useHistory()
  const { t } = useTranslation();
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
        <Spacer size="ssm" />
        {/* {{lpToken}} Earn {{token}} */}
        <div className="color-grey  text-center">
          {t("cunzhuan", {
            lpToken: item.depositTokenName,
            token: item.earnTokenName,
          })}
        </div>
        <Spacer size="mmd" />

        <Label label="TVL" value="$0" />
        <Spacer size="mmd" />
        <Label label="APY" value="0%" />

        <Spacer size="mmd" />
        <Label label={`${t("wdzy")} ${item.depositTokenName}`} value={<Value value={0} /> } />

        <Spacer size="mmd" />
        <Label label={`${t("dlqsy")} (${item.earnTokenName})`} value={<Value value={0} /> } />

        <Spacer />
        <Button text={t("xuanze")} variant="secondary"  onClick={
          ()=>{
            history.push(`/mine/pool/${item.depositContract}`)
          }
        }/>
        <Spacer size="mmd" />
      </StyledWrapBox>
    </>
  );
};
const List: React.FC = ({ mines }) => {
  const isMobile = useIsMobile();
  return (
    <>
      <div className={`width-100 ${isMobile ? "" : "flex-jc-center"} `}>
        {mines.map((item, i) => {
          return <Item item={item} key={item.name} />;
        })}
      </div>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </>
  );
};
const StyledWrapBox = styled(Card)`
  height: 400px;
  @media (max-width: 768px) {
    margin-bottom: 16px;
    height: auto;
  }
`;
export default List;
