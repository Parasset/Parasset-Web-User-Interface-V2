//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import CardButton from "../CardButton";

const Select: React.FC = ({}) => (
  <div className="position-relative">
    <CardButton className="wing-blank-lg " size="lg">
      <div className="flex-jc-center">
        <div className="flex-jc-center">
          <img
            src={require("../../assets/img/ETH_icon.png")}
            width="35"
            height="35"
            className="margin-right-10"
          />
          ETH
          <img
            src={require("../../assets/img/arrow_bottom_icon.png")}
            width="8"
            height="5"
            className="margin-left-10"
          />
        </div>
        <div>0.000001</div>
      </div>
      <StyledSelectBox className="form-select-content  cursor-pointer">
        <StyledSelectItem className="flex-jc-center  wing-blank-lg ">
          <div className="flex-jc-start">
            <img
              src={require("../../assets/img/ETH_icon.png")}
              width="35"
              height="35"
              className="margin-right-10"
            />
            ETH
          </div>
          <div>0.000001</div>
        </StyledSelectItem>
        <StyledSelectItem className="flex-jc-center  wing-blank-lg active">
          <div className="flex-jc-start">
            <img
              src={require("../../assets/img/ETH_icon.png")}
              width="35"
              height="35"
              className="margin-right-10"
            />
            ETH
          </div>
          <div>0.000001</div>
        </StyledSelectItem>
      </StyledSelectBox>
    </CardButton>
  </div>
);

const StyledSelectBox = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  border-radius: 40px;
  top: 65px;
  z-index: 99;
  background: #fff;
  box-shadow: 0px 0px 10px ${(props) => props.theme.color.grey[200]};
`;
const StyledSelectItem = styled.div`
  height: 50px;
  border-radius: 40px;
  &.active {
    background-color: ${(props) => props.theme.color.grey[500]};
  }
`;

export default Select;
