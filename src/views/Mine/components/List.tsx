//@ts-nocheck
import React, { useMemo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Label from "../../../components/Label";
import TokenSymbol from "../../../components/TokenSymbol";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";
import useMineInfo from "../../../hooks/mine/useMineInfo";
import useItank from "../../../hooks/itank/useItank";
import { getNumberToMax } from "../../../utils/formatBalance";
const Item: React.FC = ({ item }) => {
  const isMobile = useIsMobile();
  const history = useHistory();
  const { t } = useTranslation();
  const itank = useItank(item.depositContract);

  const mineInfo = useMineInfo(item, itank);

  const staked = useMemo(() => getNumberToMax(mineInfo.staked), [
    mineInfo.staked,
  ]);
  const status = useMemo(() => {
    const rewardRate =  mineInfo.info.rewardRate;
    return {
      color: rewardRate > 0 ? "#0CC69D" : "#878787",
      text: rewardRate > 0 ? "jxz" : "yzt",
    };
  }, [mineInfo.info.rewardRate]);
  return (
    <>
      <StyledWrapBox className={`wing-blank-lg bg-white ${isMobile ? "" : "with-100-24"} `}>
        <StyledTag color={status.color}>{t(status.text)}</StyledTag>
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

        <Label label="TVL" value={<Value value={mineInfo.tvl} prefix="$" />} />
        <Spacer size="mmd" />
        <Label label="APY" value={<Value value={mineInfo.apy} suffix="%" />} />

        <Spacer size="mmd" />
        <Label
          label={`${t("wdzy")} (${item.depositTokenName})`}
          value={<Value value={staked} />}
        />

        <Spacer size="mmd" />
        <Label
          label={`${t("dlqsy")} (${item.earnTokenName})`}
          value={<Value value={mineInfo.earned} />}
        />
        <Spacer />
        <Button
          text={t("xuanze")}
          variant="secondary"
          onClick={() => {
            history.push(`/mine/pool/${item.depositContract}`);
          }}
        />
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
      <Spacer/>
    </>
  );
};
const StyledWrapBox = styled(Card)`
  /* min-height: 420px; */
  position: relative;
  @media (max-width: 768px) {
    margin-bottom: 16px;
    height: auto;
  }
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
export default List;
