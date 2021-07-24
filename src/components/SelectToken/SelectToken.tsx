//@ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import CardButton from "../CardButton";
const Select: React.FC = ({
  showSelect,
  list,
  active,
  toggleShow,
  onChangeSelect,
}) => {
  const selectItem = useMemo(() => {
    let item = list.filter((item) => {
      return item.id === active;
    });
    return item[0];
  }, [list, active]);

  return (
    < >
      <div className="wing-blank">

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
                    onChangeSelect(item);
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
                  
                </StyledSelectItem>
              );
            })}
          </StyledSelectBox>
        ) : null}
      </div>
    </>
  );
};

const StyledSelectBox = styled.div`
  position: absolute;
  width: 140px;
  left: 0;
  border-radius: 10px;
  padding: 5px 0;
  top: 120%;
  z-index: 99;
  background: #fff;
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
`;
const StyledSelectItem = styled.div`
  height: 40px;
  &.active {
    background-color: ${(props) => props.theme.color.grey[500]};
  }
`;

export default Select;
