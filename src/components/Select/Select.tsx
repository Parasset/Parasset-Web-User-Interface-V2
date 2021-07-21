//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import CardButton from "../CardButton";
import Input from "../Input";
const Select: React.FC = ({
  showSelect,
  list,
  active,
  toggleShow,
  onChangeSelect,

  isInputCurrencySelect,
  value,
  handleChange,
}) => {
  const selectItem = useMemo(() => {
    let item = list.filter((item) => {
      return item.id === active;
    });
    return item[0];
  }, [list, active]);

  return (
    <div className="position-relative">
      <CardButton className="wing-blank-lg " size="lg">
        <div
          className="flex-jc-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleShow();
          }}
        >
          <div className="flex-jc-center">
            <img
              src={require(`../../assets/img/${selectItem?.name}.png`)}
              width="35"
              height="35"
              className="margin-right-10"
            />
            {selectItem?.name}
            <img
              src={require("../../assets/img/arrow_bottom_icon.png")}
              width="8"
              height="5"
              className="margin-left-10"
            />
          </div>
          <div
            className="flex-jc-end"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Input value={value} onChange={handleChange} type="number" />
          </div>
        </div>
        {showSelect ? (
          <StyledSelectBox
            className="form-select-content  "
            onClick={(e) => {
              e.stopPropagation();

              toggleShow();
            }}
          >
            {list.map((item, i) => {
              return (
                <StyledSelectItem
                  className={`flex-jc-center  wing-blank-lg cursor-pointer ${
                    item.id === active ? "active" : ""
                  } `}
                  key={item.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangeSelect(item, i);
                    toggleShow();
                  }}
                >
                  <div className="flex-jc-start">
                    <img
                      src={require(`../../assets/img/${item.name}.png`)}
                      width="35"
                      height="35"
                      className="margin-right-10"
                    />
                    {item.name}
                  </div>
                  <div>
                    {isInputCurrencySelect
                      ? item.walletBalance
                      : item.itankBalance}
                  </div>
                </StyledSelectItem>
              );
            })}
          </StyledSelectBox>
        ) : null}
      </CardButton>
    </div>
  );
};

const StyledSelectBox = styled.div`
  /* display: none; */
  position: absolute;
  width: 100%;
  left: 0;
  border-radius: 10px;
  padding: 5px 0;
  top: 65px;
  z-index: 99;
  background: #fff;
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
`;
const StyledSelectItem = styled.div`
  height: 50px;
  &.active {
    background-color: ${(props) => props.theme.color.grey[500]};
  }
`;

export default Select;
