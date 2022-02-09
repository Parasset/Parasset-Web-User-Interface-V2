//@ts-nocheck
import React, {useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import TokenSymbol from "../../../components/TokenSymbol";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Value from "../../../components/Value";
import useIsMobile from "../../../hooks/useIsMobile";

const Stake: React.FC = ({mine, staked, onSelect, onOpenModal}) => {
  const isMobile = useIsMobile();
  const {t} = useTranslation();

  return (
    <>
      <StyledWrapBox className={`bg-white wing-blank-lg ${isMobile ? "" : "width-47"} `}>
        <Spacer size="mmd"/>
        <div className="color-grey">{t("wddy")}</div>
        <Spacer/>
        <div className="wing-blank-llg  text-center">
          <div className="flex-row-center-center">
            <TokenSymbol symbol={mine.icon1} size={40}/>
            <TokenSymbol symbol={mine.icon2} size={40} isRight={true}/>
          </div>

          <Spacer size="sm"/>
          <div className="font-size-24 bold-600">
            <Value value={staked}/>
          </div>
          <Spacer size="sm"/>
          <div className="color-grey">
            {t("ydy")} ({mine.depositTokenName})
          </div>
          <Spacer/>
          {/* {approveStatus ? (
            <>
              <div className="flex-row-center-center">
                <Button
                  text={t("sq")}
                  variant="secondary"
                  width="47%"
                  disabled={pendingTx}
                  onClick={async () => {
                    setPendingTx(true);
                    await approve();
                    setPendingTx(false);
                  }}
                />
              </div>
            </>
          ) : (

          )} */}


          <div className="flex-jc-center">
            <Button
              text={` ${t("diya")} ${mine.depositTokenName} `}
              variant="secondary"
              width="47%"
              onClick={() => {
                onSelect(1);
                onOpenModal();
              }}
            />
            <Button
              text={t("shuhui")}
              variant="tertiary"
              width="47%"
              onClick={() => {
                onSelect(2);
                onOpenModal();
              }}
            />
          </div>
        </div>

        <Spacer size="mmd"/>
      </StyledWrapBox>
    </>
  );
};

const StyledWrapBox = styled(Card)`
  @media (max-width: 768px) {
    height: auto;
  }
`;

export default Stake;
