//@ts-nocheck
import React, { useMemo, useState } from "react";
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
  onBlur,
  onFocus,
}) => {
  const [isBlur, setIsBlur] = useState(false);
  const selectItem = useMemo(() => {
    let item = list.filter((item) => {
      return item.id === active;
    });
    return item[0];
  }, [list, active]);

  return (
    <div className="position-relative">
      <CardButton
        className={`${
          isBlur ? "input-focus" : "input-no-focus"
        }  wing-blank-lg  input-dark-box`}
        size="lg"
      >
        <div
          className="flex-jc-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleShow();
          }}
        >
          <div className="flex-jc-center">
            <img
              alt="image"
              src={require(`../../assets/svg/${selectItem?.name}.svg`)}
              width="35"
              height="35"
              className="margin-right-10"
            />
            {selectItem?.name}
            <img
              alt="image"
              src={
                showSelect
                  ? require("../../assets/svg/icon_arrow_top.svg")
                  : require("../../assets/svg/arrow_bottom_icon.svg")
              }
              width="8"
              height="5"
              className="margin-left-10"
            />
          </div>
          <div
            className="flex-jc-end of-hide"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Input
              value={value}
              onChange={handleChange}
              type="number"
              onBlur={(e) => {
                onBlur(e);
                setIsBlur(false);
              }}
              onFocus={(e) => {
                onFocus(e);
                setIsBlur(true);
              }}
            />
          </div>
        </div>
        {showSelect ? (
          <StyledSelectBox
            className="form-select-content"
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
                      alt="image"
                      src={require(`../../assets/svg/${item.name}.svg`)}
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
  z-index: 1080;
  background: #fff;
  box-shadow: 0 0 10px ${(props) => props.theme.color.grey[200]};
`;
const StyledSelectItem = styled.div`
  height: 50px;
  &.active {
    background-color: ${(props) => props.theme.color.grey[500]};
  }
`;

export default Select;
