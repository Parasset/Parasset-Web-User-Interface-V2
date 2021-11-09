//@ts-nocheck
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Spacer from "../Spacer";
import Card from "../Card";
const TableTitle: React.FC = ({ titles }) => {
  const { t } = useTranslation();
  return (
    <StyledTableTitleBox>
      <Card className=" flex-jc-center color-grey">
        {titles.map((item) => {
          return (
            <div className="flex1" key={item}>
              {t(item)}
            </div>
          );
        })}
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
