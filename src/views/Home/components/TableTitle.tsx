//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
const TableTitle: React.FC = ({  }) => {
  const { t } = useTranslation();
  return (
    <StyledTableTitleBox>
      <Card className=" flex-jc-center color-grey">
        <div className="flex1">{t('dyzc')}</div>
        <div className="flex1">TVL</div>
        <div className="flex1">{t('diyashu')}</div>
        <div className="flex1">{t('zddyl')}</div>
        <div className="flex1">{t('qsdyl')}</div>
      </Card>
      <Spacer size="sm" />
      <Spacer size="sm" />
    </StyledTableTitleBox>
  );
};
const StyledTableTitleBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default TableTitle;
