//@ts-nocheck
import React from "react";
import styled from "styled-components";
import Spacer from "../../../components/Spacer";
import Card from "../../../components/Card";
import CardButton from "../../../components/CardButton";
import Label from "../../../components/Label";
import Button from "../../../components/Button";

const Info: React.FC = ({ icon, currency }) => {
  return (
    <>
      <CardButton className="width-100 wing-blank-lg" size="lg">
        <div className="flex-jc-center width-100">
          <div className="flex-jc-center ">
            <img
              src={icon}
              width="35"
              height="35"
              className="margin-right-10"
            />
            {currency}
          </div>
          <div className="text-right">
            <div className="font-size-14">20,000</div>
            <div className="color-grey font-size-10">$ 20,000</div>
          </div>
        </div>
      </CardButton>
    </>
  );
};

export default Info;
