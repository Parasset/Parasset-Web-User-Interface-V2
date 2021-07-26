//@ts-nocheck
import React, {useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import {
  getNumberToMax,
  getNumberToAll,
} from "../../utils/formatBalance";
import Back from "../../components/Back";
import Info from "./components/Info";
import Harvest from "./components/Harvest";
import Stake from "./components/Stake";
import BtnLink from "../../components/BtnLink";
import Spacer from "../../components/Spacer";
import useMine from "../../hooks/mine/useMine";
import useMineInfo from "../../hooks/mine/useMineInfo";
import useItank from "../../hooks/itank/useItank";
import useTokenBalance from "../../hooks/useTokenBalance";
import OperatModal from "./components/OperatModal";
const Mine: React.FC = () => {
  const [select, setSelect] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { mineId } = useParams();
  const mine = useMine(mineId);
  const itank = useItank(mineId);
  const mineInfo = useMineInfo(mine,itank);
  const displayStakeBalance = useMemo(() => getNumberToMax(mineInfo.staked), [
    mineInfo.staked,
  ]);
  const displayStakeBalance1 = useMemo(() => getNumberToAll(mineInfo.staked), [
    mineInfo.staked,
  ]);

  const depositBalance = useTokenBalance(mine?.depositToken)






  return (
    <>
      <Back
        text={`${mine?.name} LP ${t("kuangchi")} `}
        img={mine.icon1}
        img1={mine.icon2}
      />
      <Info mine={mine} mineInfo={mineInfo} />
      <div className={` ${isMobile ? "" : "flex-jc-center width-100"} `}>
        <Harvest mine={mine} mineInfo={mineInfo} />
        {isMobile ? <Spacer size="mmd" /> : null}
        <Stake
          mine={mine}
          mineInfo={mineInfo}
          staked={displayStakeBalance}
          staked1={displayStakeBalance1}
          onSelect={el => {
            setSelect(el)
          }}
          onOpenModal={() => setIsOpen(true)}
        />
      </div>
      <BtnLink
        text={` ${t("hq")} ${mine.depositTokenName}`}
        path={`/itank/detail/${mine.depositContract}`}
      />
      <OperatModal
        isOpen={isOpen}
        mine={mine}
        mineInfo={mineInfo}
        onDismiss={() => setIsOpen(false)}
        select={select}
        key={select + isOpen}
       
        depositBalance={depositBalance}
        stakeBalance={displayStakeBalance1}
      />
    </>
  );
};

export default Mine;
