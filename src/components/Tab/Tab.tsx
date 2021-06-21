//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Card from "../Card";

const Tab: React.FC = ({ tabs, tab, onChangeTab }) => (
  <Card className="flex-jc-center text-center">
    {tabs.map((item) => {
      return (
        <StyledTabItem
          key={item.id}
          className={`${item.id === tab ? "active" : ""} flex1`}
          onClick={() => {
            onChangeTab(item.id);
          }}
        >
          <span className=" cursor-pointer color-grey">{item.text}</span>
        </StyledTabItem>
      );
    })}
  </Card>
);

const StyledTabItem = styled.div`
  &.active span {
    color: ${(props) => props.theme.color.primary.main}!important;
    box-sizing: border-box;
  }
`;
export default Tab;
