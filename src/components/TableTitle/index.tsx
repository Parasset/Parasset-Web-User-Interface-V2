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
      <Card className=" flex-jc-center color-grey bg-white">
        {titles.map((item, i) => {
          return (
            <div className={item.className} key={item.text + i}>
              {t(item.text)}
            </div>
          );
        })}
      </Card>
      <Spacer />
    </StyledTableTitleBox>
  );
};
const StyledTableTitleBox = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

export default TableTitle;
